import React, { useState } from 'react';
import { Eye, EyeOff, Swords, Play, X, RotateCcw } from 'lucide-react';
import { LanguageId, WordCategory } from '../types';
import { cleanWord } from '../utils/words';
import { retroAudio } from '../utils/audio';
import { t } from '../utils/i18n';

interface LocalMultiplayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDuel: (secretWord: string, category: WordCategory, hint: string, p1Name: string, p2Name: string) => void;
  p1Score: number;
  p2Score: number;
  onResetScores: () => void;
  language?: LanguageId;
}

export const LocalMultiplayerModal: React.FC<LocalMultiplayerModalProps> = ({
  isOpen,
  onClose,
  onStartDuel,
  p1Score,
  p2Score,
  onResetScores,
  language = 'es',
}) => {
  const [p1Name, setP1Name] = useState<string>('PLAYER 1');
  const [p2Name, setP2Name] = useState<string>('PLAYER 2');
  const [activeWriter, setActiveWriter] = useState<'p1' | 'p2'>('p1');
  const [secretWord, setSecretWord] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [category] = useState<WordCategory>('personalizada');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cleanWord(secretWord);
    if (!cleaned || cleaned.length < 3) {
      setErrorMsg('Word must have at least 3 letters.');
      retroAudio.playError();
      return;
    }

    retroAudio.playSuccess();
    onStartDuel(
      cleaned, 
      category, 
      hint.trim() || 'Custom Word',
      p1Name.trim() || 'PLAYER 1',
      p2Name.trim() || 'PLAYER 2'
    );
  };

  const handleSwapWriters = () => {
    retroAudio.playClick();
    setActiveWriter(prev => (prev === 'p1' ? 'p2' : 'p1'));
    setSecretWord('');
    setHint('');
    setErrorMsg('');
  };

  const writerName = activeWriter === 'p1' ? p1Name : p2Name;
  const guesserName = activeWriter === 'p1' ? p2Name : p1Name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-zinc-900 border-4 border-emerald-500 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Swords className="w-6 h-6 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-pixel text-emerald-400">{t('local2p', language)}</h2>
          </div>
          <button
            onClick={() => {
              retroAudio.playClick();
              onClose();
            }}
            className="p-1 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-black/60 border-2 border-zinc-800 rounded-lg text-center">
          <div className="flex flex-col items-center border-r border-zinc-800 pr-2">
            <input
              type="text"
              value={p1Name}
              maxLength={12}
              onChange={e => setP1Name(e.target.value.toUpperCase())}
              className="text-[11px] font-pixel text-emerald-400 bg-transparent text-center border-b border-transparent focus:border-emerald-400 outline-none w-full"
            />
            <span className="text-2xl font-pixel text-white font-bold">{p1Score}</span>
            <span className="text-[9px] font-retro text-zinc-400">{t('victory', language)}</span>
          </div>

          <div className="flex flex-col items-center pl-2">
            <input
              type="text"
              value={p2Name}
              maxLength={12}
              onChange={e => setP2Name(e.target.value.toUpperCase())}
              className="text-[11px] font-pixel text-blue-400 bg-transparent text-center border-b border-transparent focus:border-blue-400 outline-none w-full"
            />
            <span className="text-2xl font-pixel text-white font-bold">{p2Score}</span>
            <span className="text-[9px] font-retro text-zinc-400">{t('victory', language)}</span>
          </div>
        </div>

        {/* Turn indicator */}
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-pixel text-zinc-400">{t('theWordWas', language)}:</span>
            <span className="text-xs font-pixel text-emerald-300 font-bold">{writerName} ✍️</span>
            <span className="text-[10px] font-retro text-zinc-400">({guesserName} 👀)</span>
          </div>
          <button
            type="button"
            onClick={handleSwapWriters}
            className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded text-[9px] font-pixel text-zinc-300 flex items-center gap-1 pixel-btn"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('nextLevel', language)}</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Secret Word Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-pixel text-zinc-300">{t('theWordWas', language)}:</label>
            <div className="relative">
              <input
                id="input-duel-secret-word"
                type={showSecret ? 'text' : 'password'}
                value={secretWord}
                onChange={e => {
                  setSecretWord(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="Ex: PAC MAN"
                className="w-full px-3 py-2.5 bg-zinc-950 border-2 border-zinc-700 rounded text-sm font-pixel text-emerald-300 tracking-widest focus:border-emerald-500 outline-none pr-10"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowSecret(prev => !prev)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Hint Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-pixel text-zinc-300">{t('hint', language)}:</label>
            <input
              id="input-duel-hint"
              type="text"
              value={hint}
              maxLength={60}
              onChange={e => setHint(e.target.value)}
              placeholder="Ex: Arcade classic"
              className="w-full px-3 py-2 bg-zinc-950 border-2 border-zinc-700 rounded text-xs font-retro text-zinc-200 focus:border-emerald-500 outline-none"
            />
          </div>

          {errorMsg && (
            <div className="text-[10px] font-pixel text-rose-400 bg-rose-950/50 p-2 border border-rose-800 rounded">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Submit Action */}
          <button
            id="btn-start-duel-round"
            type="submit"
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel text-xs sm:text-sm rounded-lg border-3 border-emerald-800 pixel-btn font-bold flex items-center justify-center gap-2 shadow-lg mt-1"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t('startGame', language)}: {guesserName}</span>
          </button>
        </form>

        {/* Reset scores button */}
        {(p1Score > 0 || p2Score > 0) && (
          <div className="flex justify-end pt-1">
            <button
              onClick={() => {
                retroAudio.playClick();
                onResetScores();
              }}
              className="text-[9px] font-pixel text-zinc-500 hover:text-rose-400 underline"
            >
              {t('resetData', language)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
