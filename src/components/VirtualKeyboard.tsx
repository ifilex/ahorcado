import React from 'react';
import { retroAudio } from '../utils/audio';
import { LanguageId } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../utils/i18n';

interface VirtualKeyboardProps {
  guessedLetters: Set<string>;
  targetLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
  onUseHint?: () => void;
  hintsAvailable: number;
  hintCost: number;
  coins: number;
  canUseHint: boolean;
  language?: LanguageId;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  guessedLetters,
  targetLetters,
  onGuess,
  disabled,
  onUseHint,
  hintCost,
  canUseHint,
  language = 'es',
}) => {
  const currentLangConfig = SUPPORTED_LANGUAGES.find(l => l.id === language) || SUPPORTED_LANGUAGES[0];
  const keyboardRows = currentLangConfig.alphabet;

  const handleKeyClick = (letter: string) => {
    if (disabled || guessedLetters.has(letter)) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
      }
    } catch {
      // ignore
    }
    retroAudio.playKeyClick();
    onGuess(letter);
  };

  const handleHintClick = () => {
    if (disabled || !canUseHint || !onUseHint) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([20, 50, 20]);
      }
    } catch {
      // ignore
    }
    retroAudio.playCoin();
    onUseHint();
  };

  const hintLabel = hintCost === 0 ? t('hint', language) : `${hintCost}🪙`;

  return (
    <div id="virtual-keyboard-container" className="w-full max-w-3xl mx-auto flex flex-col gap-1 sm:gap-1.5 select-none px-1">
      {keyboardRows.map((row, rowIdx) => (
        <div key={`row-${rowIdx}`} className="flex justify-center items-center gap-0.5 sm:gap-1">
          {/* Hint button on the last row left side */}
          {rowIdx === keyboardRows.length - 1 && onUseHint && (
            <button
              id="btn-hint-letter"
              onClick={handleHintClick}
              disabled={disabled || !canUseHint}
              title={`${t('hint', language)} (${hintCost === 0 ? t('hintFree', language) : `${hintCost} ${t('coins', language)}`})`}
              className={`h-10 sm:h-11 px-2 sm:px-2.5 text-[9px] sm:text-xs font-pixel rounded flex items-center justify-center border-2 pixel-btn ${
                canUseHint && !disabled
                  ? 'bg-amber-500 border-amber-800 text-black hover:bg-amber-400 active:translate-y-1'
                  : 'bg-zinc-800 border-zinc-900 text-zinc-500 opacity-50 cursor-not-allowed'
              }`}
            >
              💡 {hintLabel}
            </button>
          )}

          {row.map(letter => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = isGuessed && targetLetters.has(letter);
            const isWrong = isGuessed && !targetLetters.has(letter);

            let keyStyle = 'bg-zinc-800 border-zinc-950 text-zinc-100 hover:bg-zinc-700 active:translate-y-0.5 shadow-md';
            if (isCorrect) {
              keyStyle = 'bg-emerald-600 border-emerald-950 text-white opacity-80 cursor-default shadow-none translate-y-0.5';
            } else if (isWrong) {
              keyStyle = 'bg-rose-950/70 border-rose-950 text-rose-400 opacity-40 cursor-default shadow-none';
            }

            return (
              <button
                key={letter}
                id={`btn-key-${letter}`}
                onClick={() => handleKeyClick(letter)}
                disabled={disabled || isGuessed}
                className={`min-w-[24px] sm:min-w-[32px] md:min-w-[36px] flex-1 max-w-[42px] h-10 sm:h-11 text-xs sm:text-sm md:text-base font-pixel rounded flex items-center justify-center border-2 transition-all font-bold ${keyStyle}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
