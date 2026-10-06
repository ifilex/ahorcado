import React from 'react';
import { LanguageId, WordCategory } from '../types';
import { getCategoryMeta, t } from '../utils/i18n';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  category: WordCategory;
  hint: string;
  showAll: boolean; // When game over, reveal missing letters in red
  funFact?: string;
  isWon: boolean;
  language?: LanguageId;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  guessedLetters,
  category,
  hint,
  showAll,
  funFact,
  isWon,
  language = 'es',
}) => {
  const categoryMeta = getCategoryMeta(category, language) || { name: 'Arcade', icon: '🕹️' };

  // Split words by space for multiline wrapping
  const wordTokens = word.split(' ');

  return (
    <div id="word-display-container" className="flex flex-col items-center gap-3 w-full max-w-2xl mx-auto px-2">
      {/* Category and Hint Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="px-3 py-1 bg-zinc-900 border-2 border-zinc-700 text-amber-400 text-xs font-pixel rounded-full flex items-center gap-1.5 shadow">
          <span>{categoryMeta.icon}</span>
          <span>{categoryMeta.name}</span>
        </span>
        {hint && (
          <span className="px-3 py-1 bg-zinc-900 border-2 border-indigo-900/60 text-indigo-300 text-xs font-retro rounded-full max-w-xs sm:max-w-md truncate text-center">
            💡 {t('hint', language)}: {hint}
          </span>
        )}
      </div>

      {/* Secret Word Tiles */}
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 py-2">
        {wordTokens.map((token, tokenIdx) => (
          <div key={`token-${tokenIdx}`} className="flex gap-1.5 sm:gap-2">
            {token.split('').map((char, charIdx) => {
              const isRevealed = guessedLetters.has(char);
              const isMissing = showAll && !isRevealed;

              let tileStyle = 'border-zinc-700 bg-zinc-900/90 text-transparent';
              if (isRevealed) {
                tileStyle = isWon 
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 animate-pixel-float shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                  : 'border-amber-400 bg-zinc-900 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.25)]';
              } else if (isMissing) {
                tileStyle = 'border-rose-600 bg-rose-950/70 text-rose-400 animate-pulse';
              }

              return (
                <div
                  key={`char-${tokenIdx}-${charIdx}`}
                  className={`w-8 h-10 sm:w-11 sm:h-13 md:w-12 md:h-14 border-b-4 sm:border-b-4 border-2 rounded flex items-center justify-center text-base sm:text-xl md:text-2xl font-pixel font-bold transition-all duration-150 ${tileStyle}`}
                >
                  {isRevealed || showAll ? char : '_'}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Fun Fact or Post-Game lore */}
      {funFact && (showAll || isWon) && (
        <div className="mt-1 px-4 py-2 bg-zinc-900/80 border border-zinc-700 rounded text-center text-xs sm:text-sm font-arcade text-zinc-300 max-w-lg animate-fade-in">
          💡 <span className="text-amber-400 font-bold">{t('funFact', language)}:</span> {funFact}
        </div>
      )}
    </div>
  );
};
