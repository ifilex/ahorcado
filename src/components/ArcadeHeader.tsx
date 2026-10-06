import React from 'react';
import { Volume2, VolumeX, Music, Settings, Home, Globe } from 'lucide-react';
import { GameDifficulty, LanguageId } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../utils/i18n';

interface ArcadeHeaderProps {
  score: number;
  streak: number;
  coins: number;
  lives: number;
  maxLives: number;
  difficulty: GameDifficulty;
  bombTimeLeft?: number;
  isMuted: boolean;
  isMusicActive: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
  language?: LanguageId;
  onChangeLanguage?: (lang: LanguageId) => void;
}

export const ArcadeHeader: React.FC<ArcadeHeaderProps> = ({
  score,
  streak,
  coins,
  lives,
  maxLives,
  difficulty,
  bombTimeLeft,
  isMuted,
  isMusicActive,
  onToggleSound,
  onToggleMusic,
  onOpenSettings,
  onGoHome,
  language = 'es',
  onChangeLanguage,
}) => {
  const [showLangDropdown, setShowLangDropdown] = React.useState(false);
  const formattedScore = String(score).padStart(6, '0');
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.id === language) || SUPPORTED_LANGUAGES[0];

  const handleSelectLang = (langId: LanguageId) => {
    if (onChangeLanguage) {
      onChangeLanguage(langId);
    }
    setShowLangDropdown(false);
  };

  return (
    <header id="arcade-header" className="w-full max-w-4xl mx-auto flex flex-col gap-2 p-2 sm:p-3 bg-zinc-900/90 border-2 border-zinc-700 rounded-lg shadow-xl mb-2 relative">
      {/* Top Bar: Nav actions & Score */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-1.5">
          <button
            id="btn-nav-home"
            onClick={onGoHome}
            title={t('home', language)}
            className="p-1.5 sm:p-2 bg-zinc-800 border-2 border-zinc-950 hover:bg-zinc-700 active:translate-y-0.5 rounded text-zinc-300"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            title={isMuted ? t('soundFx', language) : t('soundFx', language)}
            className={`p-1.5 sm:p-2 border-2 rounded active:translate-y-0.5 ${
              !isMuted 
                ? 'bg-amber-500/20 border-amber-600 text-amber-400' 
                : 'bg-zinc-800 border-zinc-950 text-zinc-500'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button
            id="btn-toggle-music"
            onClick={onToggleMusic}
            title={t('music8bit', language)}
            className={`p-1.5 sm:p-2 border-2 rounded active:translate-y-0.5 ${
              isMusicActive 
                ? 'bg-emerald-500/20 border-emerald-600 text-emerald-400 animate-pulse' 
                : 'bg-zinc-800 border-zinc-950 text-zinc-500'
            }`}
          >
            <Music className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Quick Language Picker */}
          <div className="relative">
            <button
              id="btn-quick-lang"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              title={t('language', language)}
              className="p-1.5 sm:p-2 bg-zinc-800 border-2 border-zinc-950 hover:bg-zinc-700 active:translate-y-0.5 rounded text-zinc-200 flex items-center gap-1 text-xs font-pixel"
            >
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline uppercase text-[10px]">{currentLang.id}</span>
            </button>

            {showLangDropdown && (
              <div className="absolute left-0 top-full mt-1 w-44 bg-zinc-900 border-2 border-amber-500 rounded-lg shadow-2xl z-50 p-1.5 flex flex-col gap-1 animate-fade-in max-h-60 overflow-y-auto">
                <div className="text-[9px] font-pixel text-amber-400 px-1 py-0.5 border-b border-zinc-800">
                  {t('language', language)}
                </div>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.id}
                    id={`btn-select-lang-${lang.id}`}
                    onClick={() => handleSelectLang(lang.id)}
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
        </div>

        {/* Center: Arcade Score Display */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[9px] font-pixel text-zinc-400 tracking-wider">{t('score', language)}</span>
            <span className="text-xs sm:text-lg font-pixel text-amber-400 font-bold crt-glow">
              {formattedScore}
            </span>
          </div>

          {/* Streak bonus */}
          {streak > 1 && (
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/40 px-1.5 sm:px-2 py-0.5 rounded text-amber-400 text-[9px] sm:text-xs font-pixel animate-pixel-float">
              <span>🔥</span>
              <span>x{streak}</span>
            </div>
          )}
        </div>

        {/* Right: Coins & Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 bg-zinc-950 border border-amber-500/30 px-2 py-1 rounded text-amber-300 text-[10px] sm:text-xs font-pixel">
            <span>🪙</span>
            <span>{coins}</span>
          </div>
          <button
            id="btn-open-settings"
            onClick={onOpenSettings}
            title={t('settings', language)}
            className="p-1.5 sm:p-2 bg-zinc-800 border-2 border-zinc-950 hover:bg-zinc-700 active:translate-y-0.5 rounded text-zinc-300"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Bar: Lives Counter / Bomb Timer */}
      <div className="flex items-center justify-between px-1">
        {/* Lives / Hearts */}
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] sm:text-[10px] font-pixel text-zinc-400 mr-1">{t('lives', language)}</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: maxLives }).map((_, idx) => {
              const isAlive = idx < lives;
              return (
                <span
                  key={`life-${idx}`}
                  className={`text-sm sm:text-lg transition-transform duration-200 ${
                    isAlive 
                      ? 'text-rose-500 scale-100 animate-pulse' 
                      : 'text-zinc-700 scale-75 opacity-40'
                  }`}
                >
                  {isAlive ? '❤️' : '🖤'}
                </span>
              );
            })}
          </div>
        </div>

        {/* Nightmare Bomb Timer if active */}
        {difficulty === 'nightmare' && bombTimeLeft !== undefined && (
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] sm:text-xs font-pixel font-bold ${
            bombTimeLeft <= 5 
              ? 'bg-rose-950 border-rose-500 text-rose-300 animate-bounce' 
              : 'bg-zinc-950 border-amber-500 text-amber-300'
          }`}>
            <span>💣</span>
            <span>{bombTimeLeft}s</span>
          </div>
        )}

        {/* Difficulty badge */}
        <span className={`text-[9px] font-pixel uppercase px-2 py-0.5 rounded border ${
          difficulty === 'nightmare' 
            ? 'bg-rose-950/60 border-rose-800 text-rose-400' 
            : difficulty === 'hard'
            ? 'bg-orange-950/60 border-orange-800 text-orange-400'
            : difficulty === 'normal'
            ? 'bg-blue-950/60 border-blue-800 text-blue-400'
            : 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
        }`}>
          {t(difficulty, language)}
        </span>
      </div>
    </header>
  );
};
