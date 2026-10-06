import React from 'react';
import { 
  Play, 
  Gamepad2, 
  Users, 
  Ghost, 
  Calendar, 
  ShoppingBag, 
  Trophy, 
  Settings as SettingsIcon,
  HelpCircle,
  Sparkles,
  Globe
} from 'lucide-react';
import { GameDifficulty, LanguageId, WordCategory } from '../types';
import { retroAudio } from '../utils/audio';
import { SUPPORTED_LANGUAGES, getCategoryMeta, t } from '../utils/i18n';

interface StartScreenProps {
  coins: number;
  highScore: number;
  streak: number;
  dailyStreak: number;
  hasDailyCompleted: boolean;
  onStartArcade: () => void;
  onStartClassic: (category: WordCategory, difficulty: GameDifficulty) => void;
  onOpenLocal2P: () => void;
  onOpenGhost: () => void;
  onOpenDaily: () => void;
  onOpenShop: () => void;
  onOpenScores: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
  onOpenSupport: () => void;
  onClaimDailyLogin: () => void;
  canClaimDailyReward: boolean;
  language?: LanguageId;
  onChangeLanguage?: (lang: LanguageId) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  coins,
  highScore,
  streak,
  dailyStreak,
  hasDailyCompleted,
  onStartArcade,
  onStartClassic,
  onOpenLocal2P,
  onOpenGhost,
  onOpenDaily,
  onOpenShop,
  onOpenScores,
  onOpenAchievements,
  onOpenSettings,
  onOpenSupport,
  onClaimDailyLogin,
  canClaimDailyReward,
  language = 'es',
  onChangeLanguage,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<WordCategory>('videojuegos');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<GameDifficulty>('normal');
  const [showQuickPlayConfig, setShowQuickPlayConfig] = React.useState<boolean>(false);
  const [showLangMenu, setShowLangMenu] = React.useState<boolean>(false);

  const categories: WordCategory[] = [
    'videojuegos', 'cine_retro', 'ciencia', 'animales', 
    'paises', 'programacion', 'mitologia', 'anime', 'gastronomia'
  ];

  const difficulties: { id: GameDifficulty; labelKey: 'easy' | 'normal' | 'hard' | 'nightmare'; descKey: 'easyDesc' | 'normalDesc' | 'hardDesc' | 'nightmareDesc'; color: string }[] = [
    { id: 'easy', labelKey: 'easy', descKey: 'easyDesc', color: 'border-emerald-600 text-emerald-400' },
    { id: 'normal', labelKey: 'normal', descKey: 'normalDesc', color: 'border-blue-600 text-blue-400' },
    { id: 'hard', labelKey: 'hard', descKey: 'hardDesc', color: 'border-amber-600 text-amber-400' },
    { id: 'nightmare', labelKey: 'nightmare', descKey: 'nightmareDesc', color: 'border-rose-600 text-rose-400' },
  ];

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === language) || SUPPORTED_LANGUAGES[0];

  const handleButtonClick = (action: () => void) => {
    retroAudio.playClick();
    action();
  };

  const handleSelectLanguage = (langId: LanguageId) => {
    retroAudio.playClick();
    if (onChangeLanguage) {
      onChangeLanguage(langId);
    }
    setShowLangMenu(false);
  };

  return (
    <div id="start-screen-container" className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6 py-4 px-2 sm:px-4">
      
      {/* Top Ticker: High Score, Language Selector, Coins, Daily Bonus */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-2.5 bg-zinc-900/90 border-2 border-zinc-700 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-pixel text-amber-400">{t('highScore', language)}</span>
          <span className="text-xs sm:text-sm font-pixel text-zinc-100">{String(highScore).padStart(6, '0')}</span>
        </div>
        
        {/* Language selector toggle */}
        <div className="relative">
          <button
            id="btn-language-selector"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded text-zinc-200 text-[10px] sm:text-xs font-pixel active:translate-y-0.5"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLang.flag} {currentLang.nativeName}</span>
          </button>

          {showLangMenu && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-zinc-950 border-2 border-amber-500 rounded-lg shadow-2xl z-50 p-1.5 flex flex-col gap-1 animate-fade-in max-h-64 overflow-y-auto">
              <div className="text-[9px] font-pixel text-amber-400 px-1 py-0.5 border-b border-zinc-800">
                {t('language', language)}
              </div>
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  id={`btn-menu-lang-${lang.id}`}
                  onClick={() => handleSelectLanguage(lang.id)}
                  className={`flex items-center justify-between p-1.5 rounded text-xs font-pixel transition-all ${
                    lang.id === language
                      ? 'bg-amber-500 text-black font-bold'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.nativeName}</span>
                  </div>
                  {lang.id === language && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Daily reward claim button */}
        {canClaimDailyReward ? (
          <button
            id="btn-claim-daily"
            onClick={() => handleButtonClick(onClaimDailyLogin)}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-pixel rounded border-2 border-amber-800 animate-bounce flex items-center gap-1 pixel-btn"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('claimBonus', language)}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] font-pixel text-zinc-400">
            <span>📅 {t('dailyStreak', language)}</span>
            <span className="text-amber-400">{dailyStreak} {t('dailyStreakDays', language)}</span>
          </div>
        )}

        <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-amber-500/40 text-amber-300 text-xs font-pixel">
          <span>🪙</span>
          <span>{coins}</span>
        </div>
      </div>

      {/* Main Logo & Animated Arcade Title */}
      <div className="text-center flex flex-col items-center gap-2 pt-2">
        <div className="flex items-center gap-2 text-3xl sm:text-5xl md:text-6xl font-pixel text-amber-400 tracking-wider crt-glow animate-pixel-float">
          <span>{t('gameTitle', language)}</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white font-pixel text-xs sm:text-sm px-4 py-1 rounded-full border-2 border-white/20 shadow-md">
          <span>{t('gameSubtitle', language)}</span>
        </div>
        <div className="text-xs font-pixel text-zinc-400 animate-arcade-blink mt-1">
          {t('insertCoin', language)}
        </div>
      </div>

      {/* Quick Play Configuration Drawer or Main Play Grid */}
      {showQuickPlayConfig ? (
        <div className="w-full max-w-xl p-4 bg-zinc-900 border-4 border-amber-500/80 rounded-xl shadow-2xl flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h3 className="text-sm font-pixel text-amber-400">{t('configQuickPlay', language)}</h3>
            <button
              onClick={() => setShowQuickPlayConfig(false)}
              className="text-xs font-pixel text-zinc-400 hover:text-white"
            >
              ✕ {t('back', language)}
            </button>
          </div>

          {/* Categories Grid */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-pixel text-zinc-300">{t('category', language)}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {categories.map(cat => {
                const meta = getCategoryMeta(cat, language);
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      retroAudio.playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`p-2 rounded text-left border-2 flex items-center gap-2 text-xs font-retro transition-all ${
                      isSelected
                        ? 'bg-amber-500 border-amber-300 text-black font-bold scale-[1.02]'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <span className="text-base">{meta.icon}</span>
                    <span className="truncate">{meta.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulties */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-pixel text-zinc-300">{t('difficulty', language)}</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {difficulties.map(diff => {
                const isSelected = selectedDifficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => {
                      retroAudio.playClick();
                      setSelectedDifficulty(diff.id);
                    }}
                    className={`p-2 rounded border-2 flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-zinc-100 border-white text-black font-bold'
                        : `bg-zinc-800/80 ${diff.color} hover:bg-zinc-700`
                    }`}
                  >
                    <span className="text-[10px] font-pixel uppercase">{t(diff.labelKey, language)}</span>
                    <span className="text-[9px] font-retro text-center opacity-80">{t(diff.descKey, language)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Play Confirm Button */}
          <button
            id="btn-confirm-quickplay"
            onClick={() => handleButtonClick(() => onStartClassic(selectedCategory, selectedDifficulty))}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel text-sm rounded-lg border-4 border-emerald-800 pixel-btn font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{t('startGame', language)}</span>
          </button>
        </div>
      ) : (
        /* Primary Mode Launchers */
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* 1. Arcade Adventure Mode (Highlighted) */}
          <button
            id="btn-mode-arcade"
            onClick={() => handleButtonClick(onStartArcade)}
            className="col-span-1 sm:col-span-2 p-4 sm:p-5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black border-4 border-amber-900 rounded-xl pixel-btn shadow-xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="p-3 bg-black/10 rounded-lg border-2 border-black/20">
                <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-pixel font-bold flex items-center gap-2">
                  <span>{t('arcadeMode', language)}</span>
                  <span className="text-[9px] bg-black text-amber-400 px-1.5 py-0.5 rounded font-pixel">{t('popularBadge', language)}</span>
                </div>
                <div className="text-xs font-retro text-black/80 mt-0.5">
                  {t('arcadeDesc', language)}
                </div>
              </div>
            </div>
            <Play className="w-6 h-6 fill-current group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 2. Quick Play Custom */}
          <button
            id="btn-mode-quickplay"
            onClick={() => handleButtonClick(() => setShowQuickPlayConfig(true))}
            className="p-3.5 sm:p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-3 border-zinc-950 rounded-xl pixel-btn flex items-center gap-3 text-left"
          >
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/40">
              <Play className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-pixel font-bold text-blue-400">{t('quickPlay', language)}</div>
              <div className="text-[11px] font-retro text-zinc-400">{t('quickPlayDesc', language)}</div>
            </div>
          </button>

          {/* 3. Local 1 vs 1 Multiplayer */}
          <button
            id="btn-mode-local2p"
            onClick={() => handleButtonClick(onOpenLocal2P)}
            className="p-3.5 sm:p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-3 border-zinc-950 rounded-xl pixel-btn flex items-center gap-3 text-left"
          >
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/40">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-pixel font-bold text-emerald-400">{t('local2p', language)}</div>
              <div className="text-[11px] font-retro text-zinc-400">{t('local2pDesc', language)}</div>
            </div>
          </button>

          {/* 4. Ghost / Asynchronous Multiplayer */}
          <button
            id="btn-mode-ghost"
            onClick={() => handleButtonClick(onOpenGhost)}
            className="p-3.5 sm:p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-3 border-zinc-950 rounded-xl pixel-btn flex items-center gap-3 text-left"
          >
            <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/40">
              <Ghost className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-pixel font-bold text-purple-400">{t('ghostMode', language)}</div>
              <div className="text-[11px] font-retro text-zinc-400">{t('ghostModeDesc', language)}</div>
            </div>
          </button>

          {/* 5. Daily Challenge */}
          <button
            id="btn-mode-daily"
            onClick={() => handleButtonClick(onOpenDaily)}
            className={`p-3.5 sm:p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-3 border-zinc-950 rounded-xl pixel-btn flex items-center gap-3 text-left ${
              !hasDailyCompleted ? 'ring-2 ring-amber-500/50' : ''
            }`}
          >
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-pixel font-bold text-rose-400 flex items-center gap-1.5">
                <span>{t('dailyChallenge', language)}</span>
                {!hasDailyCompleted && (
                  <span className="text-[8px] bg-rose-600 text-white px-1 py-0.2 rounded">{t('newBadge', language)}</span>
                )}
              </div>
              <div className="text-[11px] font-retro text-zinc-400">{t('dailyChallengeDesc', language)}</div>
            </div>
          </button>
        </div>
      )}

      {/* Secondary Quick Navigation: Shop, Records, Achievements, Settings, Support */}
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-zinc-800">
        <button
          id="btn-open-shop"
          onClick={() => handleButtonClick(onOpenShop)}
          className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 rounded-lg text-amber-300 text-xs font-pixel flex items-center gap-1.5 pixel-btn"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>{t('shop', language)}</span>
        </button>

        <button
          id="btn-open-scores"
          onClick={() => handleButtonClick(onOpenScores)}
          className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 rounded-lg text-cyan-300 text-xs font-pixel flex items-center gap-1.5 pixel-btn"
        >
          <Trophy className="w-4 h-4 text-cyan-400" />
          <span>{t('records', language)}</span>
        </button>

        <button
          id="btn-open-achievements"
          onClick={() => handleButtonClick(onOpenAchievements)}
          className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 rounded-lg text-emerald-300 text-xs font-pixel flex items-center gap-1.5 pixel-btn"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{t('achievements', language)}</span>
        </button>

        <button
          id="btn-open-settings-menu"
          onClick={() => handleButtonClick(onOpenSettings)}
          className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 rounded-lg text-indigo-300 text-xs font-pixel flex items-center gap-1.5 pixel-btn"
        >
          <SettingsIcon className="w-4 h-4 text-indigo-400" />
          <span>{t('settings', language)}</span>
        </button>

        <button
          id="btn-open-support-menu"
          onClick={() => handleButtonClick(onOpenSupport)}
          className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 rounded-lg text-zinc-300 text-xs font-pixel flex items-center gap-1.5 pixel-btn"
        >
          <HelpCircle className="w-4 h-4 text-zinc-400" />
          <span>{t('support', language)}</span>
        </button>
      </div>

      {/* Arcade Footer & Version */}
      <div className="text-[9px] font-pixel text-zinc-500 text-center flex items-center gap-2">
        <span>© 1989-2026 RETRO ARCADE STUDIOS</span>
        <span>•</span>
        <span>VER 2.5.0 MULTI-LANG 8-BIT</span>
      </div>
    </div>
  );
};
