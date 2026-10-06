import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Flame, Play, Home, RotateCcw, Sparkles } from 'lucide-react';
import { GameDifficulty, GameMode, LanguageId, WordCategory } from '../types';
import { retroAudio } from '../utils/audio';
import { t } from '../utils/i18n';

interface GameOverModalProps {
  isOpen: boolean;
  isWon: boolean;
  word: string;
  score: number;
  streak: number;
  coinsEarned: number;
  mode: GameMode;
  category: WordCategory;
  difficulty: GameDifficulty;
  isNewHighScore: boolean;
  onSaveHighScore: (initials: string) => void;
  onPlayNextLevel: () => void;
  onRestart: () => void;
  onGoHome: () => void;
  duelWinnerName?: string;
  language?: LanguageId;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  isWon,
  word,
  score,
  streak,
  coinsEarned,
  mode,
  isNewHighScore,
  onSaveHighScore,
  onPlayNextLevel,
  onRestart,
  onGoHome,
  duelWinnerName,
  language = 'es',
}) => {
  const [initials, setInitials] = useState<string>('AAA');
  const [initialsSaved, setInitialsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      if (isWon) {
        retroAudio.playWin();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#38bdf8'],
          });
        } catch {
          // ignore
        }
      } else {
        retroAudio.playGameOver();
      }
    }
  }, [isOpen, isWon]);

  if (!isOpen) return null;

  const handleInitialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = (initials || 'AAA').toUpperCase().slice(0, 3);
    retroAudio.playCoin();
    onSaveHighScore(clean);
    setInitialsSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-md bg-zinc-900 border-4 rounded-xl p-5 sm:p-6 shadow-2xl flex flex-col items-center gap-4 text-center text-zinc-100 ${
        isWon ? 'border-amber-400' : 'border-rose-600'
      }`}>
        
        {/* Title */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-3xl sm:text-4xl animate-bounce">
            {isWon ? '🏆' : '💀'}
          </div>
          <h2 className={`text-base sm:text-xl font-pixel font-bold crt-glow ${
            isWon ? 'text-amber-400' : 'text-rose-500'
          }`}>
            {duelWinnerName 
              ? `${duelWinnerName} ${t('duelWinner', language)}!` 
              : isWon 
              ? t('victory', language) 
              : t('gameOver', language)}
          </h2>
        </div>

        {/* Word result */}
        <div className="p-3 bg-black/60 border-2 border-zinc-800 rounded-lg w-full flex flex-col gap-1">
          <span className="text-[10px] font-pixel text-zinc-400">{t('theWordWas', language)}</span>
          <span className="text-sm sm:text-base font-pixel text-amber-300 font-bold tracking-widest">
            {word}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="p-2 bg-black/40 border border-zinc-800 rounded flex flex-col items-center">
            <span className="text-[9px] font-pixel text-zinc-400">{t('score', language)}</span>
            <span className="text-xs sm:text-sm font-pixel text-amber-400 font-bold">
              {String(score).padStart(5, '0')}
            </span>
          </div>

          <div className="p-2 bg-black/40 border border-zinc-800 rounded flex flex-col items-center">
            <span className="text-[9px] font-pixel text-zinc-400">{t('streak', language)}</span>
            <span className="text-xs sm:text-sm font-pixel text-orange-400 font-bold flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>x{streak}</span>
            </span>
          </div>

          <div className="p-2 bg-black/40 border border-zinc-800 rounded flex flex-col items-center">
            <span className="text-[9px] font-pixel text-zinc-400">{t('coinsEarned', language)}</span>
            <span className="text-xs sm:text-sm font-pixel text-amber-300 font-bold">
              +{coinsEarned}🪙
            </span>
          </div>
        </div>

        {/* New High Score Initials Entry */}
        {isNewHighScore && !initialsSaved && isWon && (
          <form onSubmit={handleInitialsSubmit} className="w-full p-3 bg-amber-950/30 border-2 border-amber-500 rounded-lg flex flex-col items-center gap-2 animate-pulse">
            <div className="flex items-center gap-1.5 text-xs font-pixel text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>{t('newRecord', language)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-pixel text-zinc-300">{t('enterInitials', language)}</span>
              <input
                type="text"
                maxLength={3}
                value={initials}
                onChange={e => setInitials(e.target.value.toUpperCase())}
                className="w-20 px-2 py-1 bg-black border-2 border-amber-400 rounded text-center text-sm font-pixel text-amber-300 tracking-widest outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-pixel rounded border border-amber-800 pixel-btn font-bold"
              >
                {t('save', language)}
              </button>
            </div>
          </form>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full pt-1">
          {mode === 'arcade' && isWon ? (
            <button
              onClick={() => {
                retroAudio.playSuccess();
                onPlayNextLevel();
              }}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel text-xs sm:text-sm rounded-lg border-3 border-emerald-800 pixel-btn font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('nextLevel', language)}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                retroAudio.playClick();
                onRestart();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-xs sm:text-sm rounded-lg border-2 border-amber-800 pixel-btn font-bold flex items-center justify-center gap-2 shadow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('playAgain', language)}</span>
            </button>
          )}

          <button
            onClick={() => {
              retroAudio.playClick();
              onGoHome();
            }}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-pixel text-xs rounded-lg border-2 border-zinc-950 pixel-btn flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>{t('mainMenu', language)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
