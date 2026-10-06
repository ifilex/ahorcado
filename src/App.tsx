import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Achievement, 
  CharacterSkin, 
  CharacterSkinId, 
  DailyQuest, 
  GameDifficulty, 
  GameMode, 
  GameSettings, 
  GhostChallengeData, 
  HighScoreEntry, 
  LanguageId, 
  SceneryId, 
  SceneryTheme, 
  UserStats, 
  WordCategory, 
  WordItem 
} from './types';
import { 
  getStoredAchievements, 
  getStoredSceneries, 
  getStoredScores, 
  getStoredSettings, 
  getStoredSkins, 
  getStoredStats, 
  getDailyQuests, 
  saveAchievements, 
  saveDailyQuests, 
  saveSceneries, 
  saveScores, 
  saveSettings, 
  saveSkins, 
  saveStats 
} from './utils/storage';
import { cleanWord, getDailyWord, getRandomWord } from './utils/words';
import { retroAudio } from './utils/audio';

import { StartScreen } from './components/StartScreen';
import { ArcadeHeader } from './components/ArcadeHeader';
import { PixelCanvasHangman } from './components/PixelCanvasHangman';
import { WordDisplay } from './components/WordDisplay';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { LocalMultiplayerModal } from './components/LocalMultiplayerModal';
import { GhostMultiplayerModal } from './components/GhostMultiplayerModal';
import { GhostHud } from './components/GhostHud';
import { ShopModal } from './components/ShopModal';
import { HighScoresModal } from './components/HighScoresModal';
import { AchievementsModal } from './components/AchievementsModal';
import { DailyEventsModal } from './components/DailyEventsModal';
import { SettingsModal } from './components/SettingsModal';
import { SupportModal } from './components/SupportModal';
import { GameOverModal } from './components/GameOverModal';

export default function App() {
  // --- Persistent Storage State ---
  const [stats, setStats] = useState<UserStats>(() => getStoredStats());
  const [scores, setScores] = useState<HighScoreEntry[]>(() => getStoredScores());
  const [skins, setSkins] = useState<CharacterSkin[]>(() => getStoredSkins());
  const [sceneries, setSceneries] = useState<SceneryTheme[]>(() => getStoredSceneries());
  const [achievements, setAchievements] = useState<Achievement[]>(() => getStoredAchievements());
  const [quests, setQuests] = useState<DailyQuest[]>(() => getDailyQuests());
  const [settings, setSettings] = useState<GameSettings>(() => getStoredSettings());

  const currentLanguage: LanguageId = settings.language || 'es';

  // Equipped Cosmetics
  const [activeSkin, setActiveSkin] = useState<CharacterSkinId>('pixel_knight');
  const [activeScenery, setActiveScenery] = useState<SceneryId>('dungeon');

  // --- Active Game Session State ---
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('arcade');
  const [currentWordItem, setCurrentWordItem] = useState<WordItem | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState<number>(0);
  const [maxMistakes, setMaxMistakes] = useState<number>(6);
  const [score, setScore] = useState<number>(0);
  const [roundStreak, setRoundStreak] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [coinsEarnedInGame, setCoinsEarnedInGame] = useState<number>(0);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);

  // Nightmare Bomb Timer (15s per letter in nightmare difficulty)
  const [bombTimer, setBombTimer] = useState<number>(15);
  const bombIntervalRef = useRef<number | null>(null);

  // Modals state
  const [showLocal2P, setShowLocal2P] = useState<boolean>(false);
  const [showGhost, setShowGhost] = useState<boolean>(false);
  const [showShop, setShowShop] = useState<boolean>(false);
  const [showScores, setShowScores] = useState<boolean>(false);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [showDaily, setShowDaily] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showSupport, setShowSupport] = useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

  // Local 2-Player duel state
  const [duelP1Score, setDuelP1Score] = useState<number>(0);
  const [duelP2Score, setDuelP2Score] = useState<number>(0);
  const [duelP1Name, setDuelP1Name] = useState<string>('PLAYER 1');
  const [duelP2Name, setDuelP2Name] = useState<string>('PLAYER 2');
  const [duelWinnerName, setDuelWinnerName] = useState<string | undefined>(undefined);

  // Ghost multiplayer state
  const [activeGhostData, setActiveGhostData] = useState<GhostChallengeData | null>(null);

  // Daily streak check
  const todayStr = new Date().toISOString().slice(0, 10);
  const hasDailyCompleted = stats.lastDailyDate === todayStr;
  const canClaimDailyReward = stats.lastDailyDate !== todayStr;

  // Language Change Handler
  const handleLanguageChange = useCallback((newLang: LanguageId) => {
    setSettings(prev => {
      const updated = { ...prev, language: newLang };
      saveSettings(updated);
      return updated;
    });
  }, []);

  // Helper: trigger screen shake
  const triggerShake = useCallback(() => {
    if (!settings.screenShake) return;
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 300);
  }, [settings.screenShake]);

  // Check achievements progress
  const updateAchievement = useCallback((id: string, increment: number = 1) => {
    setAchievements(prev => {
      const updated = prev.map(a => {
        if (a.id === id && !a.unlocked) {
          const nextProg = Math.min(a.maxProgress, a.progress + increment);
          const unlocked = nextProg >= a.maxProgress;
          if (unlocked) {
            retroAudio.playAchievement();
            setStats(s => {
              const newStats = {
                ...s,
                totalCoinsEarned: s.totalCoinsEarned + a.rewardCoins,
              };
              saveStats(newStats);
              return newStats;
            });
          }
          return { ...a, progress: nextProg, unlocked };
        }
        return a;
      });
      saveAchievements(updated);
      return updated;
    });
  }, []);

  // Update Daily Quests
  const updateDailyQuest = useCallback((type: 'win' | 'streak' | 'hard', count: number = 1) => {
    setQuests(prev => {
      const updated = prev.map(q => {
        let matches = false;
        if (type === 'win' && q.id === 'q1') matches = true;
        if (type === 'streak' && q.id === 'q2') matches = true;
        if (type === 'hard' && q.id === 'q3') matches = true;

        if (matches && !q.completed) {
          const nextVal = q.current + count;
          const completed = nextVal >= q.target;
          return { ...q, current: nextVal, completed };
        }
        return q;
      });
      saveDailyQuests(updated);
      return updated;
    });
  }, []);

  // Compute lives limit based on difficulty
  const getMaxMistakesForDiff = (diff: GameDifficulty): number => {
    switch (diff) {
      case 'easy': return 8;
      case 'normal': return 6;
      case 'hard': return 5;
      case 'nightmare': return 4;
      default: return 6;
    }
  };

  // Start a new game session
  const startNewGame = useCallback((
    wordItem: WordItem,
    mode: GameMode,
    keepStreak: boolean = false,
    ghostData: GhostChallengeData | null = null
  ) => {
    setCurrentWordItem(wordItem);
    setGameMode(mode);
    setGuessedLetters(new Set());
    setMistakes(0);
    const maxM = getMaxMistakesForDiff(wordItem.difficulty);
    setMaxMistakes(maxM);
    setIsGameOver(false);
    setIsWon(false);
    setShowGameOverModal(false);
    setDuelWinnerName(undefined);
    setActiveGhostData(ghostData);
    setGameState('playing');

    if (!keepStreak) {
      setRoundStreak(0);
      setScore(0);
    }

    // Initialize nightmare timer
    if (wordItem.difficulty === 'nightmare') {
      setBombTimer(15);
    }
  }, []);

  // Nightmare bomb tick timer
  useEffect(() => {
    if (gameState !== 'playing' || isGameOver || isWon || currentWordItem?.difficulty !== 'nightmare') {
      if (bombIntervalRef.current) {
        clearInterval(bombIntervalRef.current);
        bombIntervalRef.current = null;
      }
      return;
    }

    bombIntervalRef.current = window.setInterval(() => {
      setBombTimer(prev => {
        if (prev <= 1) {
          // Time expired! Counts as mistake
          retroAudio.playError();
          triggerShake();
          setMistakes(m => {
            const nextM = m + 1;
            if (nextM >= maxMistakes) {
              handleEndGame(false, nextM);
            }
            return nextM;
          });
          return 15;
        }
        if (prev <= 4) {
          retroAudio.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (bombIntervalRef.current) {
        clearInterval(bombIntervalRef.current);
        bombIntervalRef.current = null;
      }
    };
  }, [gameState, isGameOver, isWon, currentWordItem, maxMistakes, triggerShake]);

  // Handle End of Round (Win or Loss)
  const handleEndGame = useCallback((won: boolean, currentMistakes: number) => {
    setIsGameOver(!won);
    setIsWon(won);

    let earnedCoins = 0;
    const wordLength = currentWordItem ? cleanWord(currentWordItem.word).replace(/\s/g, '').length : 5;

    if (won) {
      const nextStreak = roundStreak + 1;
      setRoundStreak(nextStreak);

      // Score calculation: base + length bonus + remaining lives bonus + streak multiplier
      const livesLeft = maxMistakes - currentMistakes;
      const basePoints = currentWordItem?.difficulty === 'nightmare' ? 500 : currentWordItem?.difficulty === 'hard' ? 350 : 200;
      const roundPoints = (basePoints + wordLength * 30 + livesLeft * 50) * Math.max(1, nextStreak);
      setScore(s => s + roundPoints);

      // Coins reward
      earnedCoins = 30 + livesLeft * 10 + (gameMode === 'daily' ? 100 : 0);
      setCoinsEarnedInGame(earnedCoins);

      // Update User Stats
      setStats(prev => {
        const nextStats = {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          gamesWon: prev.gamesWon + 1,
          currentStreak: nextStreak,
          bestStreak: Math.max(prev.bestStreak, nextStreak),
          perfectGames: currentMistakes === 0 ? prev.perfectGames + 1 : prev.perfectGames,
          totalCoinsEarned: prev.totalCoinsEarned + earnedCoins,
          lastDailyDate: gameMode === 'daily' ? todayStr : prev.lastDailyDate,
        };
        saveStats(nextStats);
        return nextStats;
      });

      // Update Achievements
      updateAchievement('first_win', 1);
      if (nextStreak >= 3) updateAchievement('streak_3', 3);
      if (nextStreak >= 7) updateAchievement('streak_7', 7);
      if (currentMistakes === 0) updateAchievement('flawless', 1);
      if (currentWordItem?.difficulty === 'nightmare') updateAchievement('nightmare_slayer', 1);
      if (gameMode === 'daily') updateAchievement('daily_champion', 1);
      if (gameMode === 'local2p') updateAchievement('duel_master', 1);
      if (gameMode === 'ghost') updateAchievement('ghost_buster', 1);
      updateAchievement('wordsmith_25', 1);

      // Update Daily Quests
      updateDailyQuest('win', 1);
      if (nextStreak >= 3) updateDailyQuest('streak', 3);
      if (currentWordItem?.difficulty === 'hard' || currentWordItem?.difficulty === 'nightmare') {
        updateDailyQuest('hard', 1);
      }

      // Local 2-Player scoring
      if (gameMode === 'local2p') {
        setDuelWinnerName(duelP2Name);
        setDuelP2Score(s => s + 1);
      }

    } else {
      // Lost
      setRoundStreak(0);
      earnedCoins = 5; // consolation coins
      setCoinsEarnedInGame(earnedCoins);

      setStats(prev => {
        const nextStats = {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          gamesLost: prev.gamesLost + 1,
          currentStreak: 0,
          totalCoinsEarned: prev.totalCoinsEarned + earnedCoins,
        };
        saveStats(nextStats);
        return nextStats;
      });

      // Local 2-Player scoring: writer wins!
      if (gameMode === 'local2p') {
        setDuelWinnerName(duelP1Name);
        setDuelP1Score(s => s + 1);
      }
    }

    setTimeout(() => {
      setShowGameOverModal(true);
    }, 1200);
  }, [
    currentWordItem,
    roundStreak,
    maxMistakes,
    gameMode,
    todayStr,
    duelP1Name,
    duelP2Name,
    updateAchievement,
    updateDailyQuest
  ]);

  // Handle Letter Guess
  const handleLetterGuess = useCallback((letter: string) => {
    if (!currentWordItem || isGameOver || isWon || guessedLetters.has(letter)) return;

    const clean = cleanWord(currentWordItem.word);
    const targetLetters = new Set(clean.replace(/\s/g, '').split(''));

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    // Reset bomb timer on any guess
    if (currentWordItem.difficulty === 'nightmare') {
      setBombTimer(15);
    }

    if (targetLetters.has(letter)) {
      // Hit!
      retroAudio.playSuccess();
      
      // Check if all letters are guessed
      const isComplete = Array.from(targetLetters).every(l => newGuessed.has(l));
      if (isComplete) {
        handleEndGame(true, mistakes);
      }
    } else {
      // Mistake
      retroAudio.playError();
      triggerShake();
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      if (newMistakes >= maxMistakes) {
        handleEndGame(false, newMistakes);
      }
    }
  }, [currentWordItem, isGameOver, isWon, guessedLetters, mistakes, maxMistakes, handleEndGame, triggerShake]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing' || isGameOver || isWon) return;
      const key = e.key.toUpperCase();
      if (key.length === 1 && key !== ' ') {
        handleLetterGuess(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isGameOver, isWon, handleLetterGuess]);

  // Hint button logic
  const handleUseHint = () => {
    if (!currentWordItem || isGameOver || isWon) return;
    const clean = cleanWord(currentWordItem.word);
    const targetLetters = clean.replace(/\s/g, '').split('');
    const unrevealed = targetLetters.filter(l => !guessedLetters.has(l));

    if (unrevealed.length === 0) return;

    const hintCost = currentWordItem.difficulty === 'easy' ? 0 : 25;
    if (stats.totalCoinsEarned < hintCost) {
      retroAudio.playError();
      return;
    }

    // Deduct coins if applicable
    if (hintCost > 0) {
      setStats(prev => {
        const next = { ...prev, totalCoinsEarned: Math.max(0, prev.totalCoinsEarned - hintCost) };
        saveStats(next);
        return next;
      });
    }

    // Reveal one random unrevealed letter
    const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    handleLetterGuess(pick);
  };

  // Launch Mode Actions
  const handleStartArcade = () => {
    // Progressive difficulty: starts normal, goes to hard/nightmare as streak increases
    const diff: GameDifficulty = roundStreak < 2 ? 'easy' : roundStreak < 5 ? 'normal' : roundStreak < 8 ? 'hard' : 'nightmare';
    const word = getRandomWord(undefined, diff, currentLanguage);
    startNewGame(word, 'arcade', true);
  };

  const handleStartClassic = (category: WordCategory, difficulty: GameDifficulty) => {
    const word = getRandomWord(category, difficulty, currentLanguage);
    startNewGame(word, 'classic', false);
  };

  const handleStartDaily = () => {
    const word = getDailyWord(todayStr, currentLanguage);
    startNewGame(word, 'daily', false);
    setShowDaily(false);
  };

  const handleStartLocal2P = (secretWord: string, category: WordCategory, hint: string, p1: string, p2: string) => {
    setDuelP1Name(p1);
    setDuelP2Name(p2);
    const item: WordItem = {
      id: 'custom-' + Date.now(),
      word: secretWord,
      category: category || 'personalizada',
      hint: hint,
      difficulty: 'normal',
      funFact: `VS ${p1}`
    };
    setShowLocal2P(false);
    startNewGame(item, 'local2p', false);
  };

  const handlePlayGhostChallenge = (ghost: GhostChallengeData) => {
    const item: WordItem = {
      id: 'ghost-' + Date.now(),
      word: ghost.word,
      category: ghost.category,
      hint: ghost.hint,
      difficulty: ghost.difficulty,
      funFact: `Ghost: ${ghost.creatorName}`
    };
    setShowGhost(false);
    startNewGame(item, 'ghost', false, ghost);
  };

  // Claim Daily Login Reward
  const handleClaimDailyLogin = () => {
    setStats(prev => {
      const nextDays = (prev.dailyStreakDays % 7) + 1;
      const next = {
        ...prev,
        totalCoinsEarned: prev.totalCoinsEarned + 50,
        dailyStreakDays: nextDays,
        lastDailyDate: todayStr,
      };
      saveStats(next);
      return next;
    });
    retroAudio.playCoin();
  };

  // Save High Score
  const handleSaveHighScore = (initials: string) => {
    const newEntry: HighScoreEntry = {
      id: 'hs-' + Date.now(),
      initials: initials || 'ARC',
      score: score,
      streak: roundStreak,
      difficulty: currentWordItem?.difficulty || 'normal',
      category: currentWordItem?.category || 'videojuegos',
      date: todayStr,
      mode: gameMode,
    };
    const updated = [newEntry, ...scores].sort((a, b) => b.score - a.score);
    setScores(updated);
    saveScores(updated);
  };

  // Check if current score beats previous highest
  const highestExistingScore = scores.length > 0 ? scores[0].score : 0;
  const isNewHighScore = score > highestExistingScore;

  // Clean word target letters for rendering
  const cleanedTargetWord = currentWordItem ? cleanWord(currentWordItem.word) : '';
  const targetLettersSet = new Set(cleanedTargetWord.replace(/\s/g, '').split(''));

  // Theme palette class
  const paletteClass = 
    settings.palette === 'cyber_neon' ? 'theme-cyber' :
    settings.palette === 'gameboy_green' ? 'theme-gameboy' :
    settings.palette === 'pico_sunset' ? 'theme-pico' : 'theme-arcade';

  return (
    <div className={`min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-between p-2 sm:p-4 select-none relative overflow-x-hidden ${paletteClass} ${shakeScreen ? 'animate-pixel-shake' : ''}`}>
      
      {/* CRT Scanline Overlay Effect */}
      {settings.crtScanlines && (
        <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-70" />
      )}

      {/* Main Container */}
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center flex-1 z-10">
        {gameState === 'menu' ? (
          <StartScreen
            coins={stats.totalCoinsEarned}
            highScore={highestExistingScore}
            streak={stats.currentStreak}
            dailyStreak={stats.dailyStreakDays}
            hasDailyCompleted={hasDailyCompleted}
            onStartArcade={handleStartArcade}
            onStartClassic={handleStartClassic}
            onOpenLocal2P={() => setShowLocal2P(true)}
            onOpenGhost={() => setShowGhost(true)}
            onOpenDaily={() => setShowDaily(true)}
            onOpenShop={() => setShowShop(true)}
            onOpenScores={() => setShowScores(true)}
            onOpenAchievements={() => setShowAchievements(true)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenSupport={() => setShowSupport(true)}
            onClaimDailyLogin={handleClaimDailyLogin}
            canClaimDailyReward={canClaimDailyReward}
            language={currentLanguage}
            onChangeLanguage={handleLanguageChange}
          />
        ) : (
          <div className="w-full flex flex-col items-center gap-3">
            {/* Header */}
            <ArcadeHeader
              score={score}
              streak={roundStreak}
              coins={stats.totalCoinsEarned}
              lives={Math.max(0, maxMistakes - mistakes)}
              maxLives={maxMistakes}
              difficulty={currentWordItem?.difficulty || 'normal'}
              bombTimeLeft={currentWordItem?.difficulty === 'nightmare' ? bombTimer : undefined}
              isMuted={!settings.sound.sfxEnabled}
              isMusicActive={retroAudio.isMusicActive()}
              onToggleSound={() => {
                const next = !settings.sound.sfxEnabled;
                retroAudio.setMuted(!next);
                setSettings(s => ({ ...s, sound: { ...s.sound, sfxEnabled: next } }));
              }}
              onToggleMusic={() => {
                retroAudio.toggleMusic();
                setSettings(s => ({ ...s, sound: { ...s.sound, musicEnabled: retroAudio.isMusicActive() } }));
              }}
              onOpenSettings={() => setShowSettings(true)}
              onGoHome={() => {
                retroAudio.playClick();
                setGameState('menu');
              }}
              language={currentLanguage}
              onChangeLanguage={handleLanguageChange}
            />

            {/* Ghost Asynchronous HUD if active */}
            {gameMode === 'ghost' && activeGhostData && (
              <GhostHud
                ghostData={activeGhostData}
                playerMistakes={mistakes}
                playerGuessedCount={Array.from(guessedLetters).filter((l: string) => targetLettersSet.has(l)).length}
                totalLettersCount={targetLettersSet.size}
                isWon={isWon}
                isGameOver={isGameOver}
              />
            )}

            {/* Pixel Hangman Canvas */}
            <PixelCanvasHangman
              mistakes={mistakes}
              maxMistakes={maxMistakes}
              skinId={activeSkin}
              sceneryId={activeScenery}
              isWon={isWon}
              isGameOver={isGameOver}
            />

            {/* Secret Word Tiles */}
            {currentWordItem && (
              <WordDisplay
                word={cleanedTargetWord}
                guessedLetters={guessedLetters}
                category={currentWordItem.category}
                hint={currentWordItem.hint}
                showAll={isGameOver}
                funFact={currentWordItem.funFact}
                isWon={isWon}
                language={currentLanguage}
              />
            )}

            {/* Virtual Retro Keyboard */}
            <VirtualKeyboard
              guessedLetters={guessedLetters}
              targetLetters={targetLettersSet}
              onGuess={handleLetterGuess}
              disabled={isGameOver || isWon}
              onUseHint={handleUseHint}
              hintsAvailable={1}
              hintCost={currentWordItem?.difficulty === 'easy' ? 0 : 25}
              coins={stats.totalCoinsEarned}
              canUseHint={!isGameOver && !isWon}
              language={currentLanguage}
            />
          </div>
        )}
      </main>

      {/* --- MODALS & DIALOGS --- */}

      {/* 1. Local 1 vs 1 Multiplayer Modal */}
      <LocalMultiplayerModal
        isOpen={showLocal2P}
        onClose={() => setShowLocal2P(false)}
        onStartDuel={handleStartLocal2P}
        p1Score={duelP1Score}
        p2Score={duelP2Score}
        onResetScores={() => {
          setDuelP1Score(0);
          setDuelP2Score(0);
        }}
        language={currentLanguage}
      />

      {/* 2. Ghost Asynchronous Multiplayer Modal */}
      <GhostMultiplayerModal
        isOpen={showGhost}
        onClose={() => setShowGhost(false)}
        onPlayGhostChallenge={handlePlayGhostChallenge}
      />

      {/* 3. Pixel Shop Modal */}
      <ShopModal
        isOpen={showShop}
        onClose={() => setShowShop(false)}
        coins={stats.totalCoinsEarned}
        skins={skins}
        sceneries={sceneries}
        activeSkin={activeSkin}
        activeScenery={activeScenery}
        onEquipSkin={id => {
          setActiveSkin(id);
          updateAchievement('shopaholic', 1);
        }}
        onBuySkin={(id, price) => {
          setStats(s => {
            const next = { ...s, totalCoinsEarned: s.totalCoinsEarned - price };
            saveStats(next);
            return next;
          });
          setSkins(prev => {
            const next = prev.map(sk => sk.id === id ? { ...sk, unlocked: true } : sk);
            saveSkins(next);
            return next;
          });
          setActiveSkin(id);
          updateAchievement('shopaholic', 1);
        }}
        onEquipScenery={id => {
          setActiveScenery(id);
          updateAchievement('shopaholic', 1);
        }}
        onBuyScenery={(id, price) => {
          setStats(s => {
            const next = { ...s, totalCoinsEarned: s.totalCoinsEarned - price };
            saveStats(next);
            return next;
          });
          setSceneries(prev => {
            const next = prev.map(sc => sc.id === id ? { ...sc, unlocked: true } : sc);
            saveSceneries(next);
            return next;
          });
          setActiveScenery(id);
          updateAchievement('shopaholic', 1);
        }}
        onBonusCoins={amount => {
          setStats(s => {
            const next = { ...s, totalCoinsEarned: s.totalCoinsEarned + amount };
            saveStats(next);
            return next;
          });
        }}
      />

      {/* 4. High Scores & Stats Modal */}
      <HighScoresModal
        isOpen={showScores}
        onClose={() => setShowScores(false)}
        scores={scores}
        stats={stats}
      />

      {/* 5. Achievements Modal */}
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievements={achievements}
        onClaimReward={(id, reward) => {
          setStats(s => {
            const next = { ...s, totalCoinsEarned: s.totalCoinsEarned + reward };
            saveStats(next);
            return next;
          });
        }}
      />

      {/* 6. Daily Events & Quests Modal */}
      <DailyEventsModal
        isOpen={showDaily}
        onClose={() => setShowDaily(false)}
        quests={quests}
        dailyStreak={stats.dailyStreakDays}
        hasDailyCompleted={hasDailyCompleted}
        onStartDailyWord={handleStartDaily}
        onClaimQuest={(qId, reward) => {
          setQuests(prev => {
            const updated = prev.map(q => q.id === qId ? { ...q, claimed: true } : q);
            saveDailyQuests(updated);
            return updated;
          });
          setStats(s => {
            const next = { ...s, totalCoinsEarned: s.totalCoinsEarned + reward };
            saveStats(next);
            return next;
          });
        }}
      />

      {/* 7. Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={newS => {
          setSettings(newS);
          saveSettings(newS);
        }}
        onResetAllData={() => {
          localStorage.clear();
          window.location.reload();
        }}
      />

      {/* 8. Support & Sound Test Modal */}
      <SupportModal
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
      />

      {/* 9. Game Over / Victory Modal */}
      <GameOverModal
        isOpen={showGameOverModal}
        isWon={isWon}
        word={cleanedTargetWord}
        score={score}
        streak={roundStreak}
        coinsEarned={coinsEarnedInGame}
        mode={gameMode}
        category={currentWordItem?.category || 'videojuegos'}
        difficulty={currentWordItem?.difficulty || 'normal'}
        isNewHighScore={isNewHighScore}
        onSaveHighScore={handleSaveHighScore}
        onPlayNextLevel={handleStartArcade}
        onRestart={() => {
          if (currentWordItem) {
            startNewGame(currentWordItem, gameMode, false, activeGhostData);
          }
        }}
        onGoHome={() => {
          setGameState('menu');
          setShowGameOverModal(false);
        }}
        duelWinnerName={duelWinnerName}
        language={currentLanguage}
      />
    </div>
  );
}
