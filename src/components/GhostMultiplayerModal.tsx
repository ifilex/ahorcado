import React, { useState } from 'react';
import { Ghost, Copy, Check, Play, X, Share2, ArrowRight } from 'lucide-react';
import { GameDifficulty, GhostChallengeData, WordCategory } from '../types';
import { cleanWord, decodeGhostChallenge, encodeGhostChallenge } from '../utils/words';
import { retroAudio } from '../utils/audio';

interface GhostMultiplayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayGhostChallenge: (data: GhostChallengeData) => void;
}

export const GhostMultiplayerModal: React.FC<GhostMultiplayerModalProps> = ({
  isOpen,
  onClose,
  onPlayGhostChallenge,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');
  
  // Create state
  const [creatorName, setCreatorName] = useState<string>('PIXEL HERO');
  const [customWord, setCustomWord] = useState<string>('');
  const [customHint, setCustomHint] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<WordCategory>('videojuegos');
  const [customDifficulty, setCustomDifficulty] = useState<GameDifficulty>('normal');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string>('');

  // Join state
  const [inputCode, setInputCode] = useState<string>('');
  const [decodedData, setDecodedData] = useState<GhostChallengeData | null>(null);
  const [joinError, setJoinError] = useState<string>('');

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = cleanWord(customWord);
    if (!cleaned || cleaned.length < 3) {
      setCreateError('La palabra debe tener al menos 3 letras.');
      retroAudio.playError();
      return;
    }

    const data: GhostChallengeData = {
      code: '',
      creatorName: creatorName.trim() || 'Rival 8-Bit',
      word: cleaned,
      category: customCategory,
      hint: customHint.trim() || 'Reto de código fantasma',
      difficulty: customDifficulty,
      timeSeconds: 45,
      mistakesCount: 2,
      guessedLetters: ['A', 'E', 'O']
    };

    const code = encodeGhostChallenge(data);
    data.code = code;
    setGeneratedCode(code);
    setCreateError('');
    retroAudio.playSuccess();
  };

  const handleCopy = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    retroAudio.playCoin();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDecodeInput = (code: string) => {
    setInputCode(code);
    setJoinError('');
    if (!code.trim()) {
      setDecodedData(null);
      return;
    }
    const decoded = decodeGhostChallenge(code);
    if (decoded) {
      setDecodedData(decoded);
      retroAudio.playCoin();
    } else {
      setDecodedData(null);
      setJoinError('Código de reto inválido o corrupto.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-zinc-900 border-4 border-purple-500 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Ghost className="w-6 h-6 text-purple-400" />
            <h2 className="text-sm sm:text-base font-pixel text-purple-400">RETO ASÍNCRONO FANTASMA</h2>
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

        {/* Tab switcher */}
        <div className="grid grid-cols-2 gap-2 bg-black/50 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('create');
            }}
            className={`py-2 text-xs font-pixel rounded transition-all ${
              activeTab === 'create'
                ? 'bg-purple-600 text-white font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            CREAR RETO
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('join');
            }}
            className={`py-2 text-xs font-pixel rounded transition-all ${
              activeTab === 'join'
                ? 'bg-purple-600 text-white font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            INGRESAR CÓDIGO
          </button>
        </div>

        {/* Content based on Tab */}
        {activeTab === 'create' ? (
          <div className="flex flex-col gap-3">
            <form onSubmit={handleGenerate} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-pixel text-zinc-300">TU NOMBRE O ALIAS:</label>
                <input
                  type="text"
                  maxLength={12}
                  value={creatorName}
                  onChange={e => setCreatorName(e.target.value.toUpperCase())}
                  className="px-3 py-2 bg-zinc-950 border-2 border-zinc-700 rounded text-xs font-pixel text-purple-300 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-pixel text-zinc-300">PALABRA A ADIVINAR:</label>
                <input
                  type="text"
                  value={customWord}
                  onChange={e => {
                    setCustomWord(e.target.value.toUpperCase());
                    setCreateError('');
                  }}
                  placeholder="Ej: CHRONO TRIGGER"
                  className="px-3 py-2 bg-zinc-950 border-2 border-zinc-700 rounded text-xs font-pixel text-purple-300 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-pixel text-zinc-300">PISTA PARA TU AMIGO:</label>
                <input
                  type="text"
                  maxLength={50}
                  value={customHint}
                  onChange={e => setCustomHint(e.target.value)}
                  placeholder="Ej: RPG de viajes en el tiempo"
                  className="px-3 py-2 bg-zinc-950 border-2 border-zinc-700 rounded text-xs font-retro text-zinc-200 focus:border-purple-500 outline-none"
                />
              </div>

              {createError && (
                <div className="text-[10px] font-pixel text-rose-400 bg-rose-950/50 p-2 border border-rose-800 rounded">
                  ⚠️ {createError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-pixel text-xs rounded-lg border-2 border-purple-900 pixel-btn font-bold flex items-center justify-center gap-2 shadow"
              >
                <Share2 className="w-4 h-4" />
                <span>GENERAR CÓDIGO DE RETO</span>
              </button>
            </form>

            {/* Output code block */}
            {generatedCode && (
              <div className="p-3 bg-zinc-950 border-2 border-purple-500/60 rounded-lg flex flex-col gap-2 animate-fade-in">
                <span className="text-[10px] font-pixel text-purple-300">¡CÓDIGO GENERADO! COPIA Y COMPÁRTELO:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedCode}
                    className="w-full px-2 py-1.5 bg-black border border-zinc-700 rounded text-[10px] font-mono text-zinc-300 select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-purple-500 hover:bg-purple-400 text-black rounded font-pixel text-xs flex items-center gap-1 pixel-btn"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-pixel text-zinc-300">PEGA EL CÓDIGO DEL RETO:</label>
              <textarea
                rows={3}
                value={inputCode}
                onChange={e => handleDecodeInput(e.target.value)}
                placeholder="Pega aquí el código que te envió tu amigo..."
                className="w-full px-3 py-2 bg-zinc-950 border-2 border-zinc-700 rounded text-xs font-mono text-purple-300 focus:border-purple-500 outline-none resize-none"
              />
            </div>

            {joinError && (
              <div className="text-[10px] font-pixel text-rose-400 bg-rose-950/50 p-2 border border-rose-800 rounded">
                ⚠️ {joinError}
              </div>
            )}

            {/* Decoded summary preview */}
            {decodedData && (
              <div className="p-3.5 bg-purple-950/40 border-2 border-purple-500 rounded-lg flex flex-col gap-2 animate-fade-in">
                <div className="flex items-center justify-between border-b border-purple-800/60 pb-1.5">
                  <span className="text-[10px] font-pixel text-zinc-400">CREADO POR:</span>
                  <span className="text-xs font-pixel text-purple-300 font-bold">{decodedData.creatorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-pixel text-zinc-400">LONGITUD:</span>
                  <span className="text-xs font-pixel text-zinc-200">{decodedData.word.length} Letras</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-pixel text-zinc-400">PISTA:</span>
                  <span className="text-xs font-retro text-amber-300">{decodedData.hint}</span>
                </div>

                <button
                  id="btn-play-decoded-challenge"
                  onClick={() => {
                    retroAudio.playSuccess();
                    onPlayGhostChallenge(decodedData);
                  }}
                  className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel text-xs sm:text-sm rounded-lg border-2 border-emerald-800 pixel-btn font-bold flex items-center justify-center gap-2 shadow"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>¡ENFRENTAR AL FANTASMA DE {decodedData.creatorName}!</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
