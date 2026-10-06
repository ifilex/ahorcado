import React, { useState } from 'react';
import { Trophy, Globe, User, X, Medal, Flame } from 'lucide-react';
import { GameMode, HighScoreEntry, UserStats } from '../types';
import { retroAudio } from '../utils/audio';

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: HighScoreEntry[];
  stats: UserStats;
}

export const HighScoresModal: React.FC<HighScoresModalProps> = ({
  isOpen,
  onClose,
  scores,
  stats,
}) => {
  const [filterMode, setFilterMode] = useState<GameMode | 'all'>('all');
  const [tab, setTab] = useState<'leaderboard' | 'stats'>('leaderboard');

  if (!isOpen) return null;

  const filteredScores = scores.filter(s => {
    if (filterMode === 'all') return true;
    return s.mode === filterMode;
  });

  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-zinc-900 border-4 border-cyan-500 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-pixel text-cyan-400">HALL DE LA FAMA ARCADE</h2>
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

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-2 bg-black/50 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              retroAudio.playClick();
              setTab('leaderboard');
            }}
            className={`py-2 text-xs font-pixel rounded flex items-center justify-center gap-1.5 ${
              tab === 'leaderboard' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>CLASIFICACIÓN</span>
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              setTab('stats');
            }}
            className={`py-2 text-xs font-pixel rounded flex items-center justify-center gap-1.5 ${
              tab === 'stats' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>MIS ESTADÍSTICAS</span>
          </button>
        </div>

        {tab === 'leaderboard' ? (
          <div className="flex flex-col gap-3">
            {/* Filter buttons */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'TODOS' },
                { id: 'arcade', label: 'ARCADE' },
                { id: 'classic', label: 'CLÁSICO' },
                { id: 'daily', label: 'DIARIO' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => {
                    retroAudio.playClick();
                    setFilterMode(f.id as GameMode | 'all');
                  }}
                  className={`px-2.5 py-1 text-[10px] font-pixel rounded border ${
                    filterMode === f.id
                      ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="border-2 border-zinc-800 rounded-lg overflow-hidden bg-black/60">
              <div className="grid grid-cols-12 gap-1 p-2 bg-zinc-800/80 text-[10px] font-pixel text-zinc-400 border-b border-zinc-700">
                <span className="col-span-2 text-center">POS</span>
                <span className="col-span-3">JUGADOR</span>
                <span className="col-span-3 text-right">PUNTOS</span>
                <span className="col-span-2 text-center">RACHA</span>
                <span className="col-span-2 text-center">MODO</span>
              </div>

              <div className="divide-y divide-zinc-800 max-h-64 overflow-y-auto">
                {filteredScores.length === 0 ? (
                  <div className="p-4 text-center text-xs font-retro text-zinc-500">
                    No hay récords registrados en esta categoría aún.
                  </div>
                ) : (
                  filteredScores.map((score, index) => {
                    let medalIcon = null;
                    if (index === 0) medalIcon = '🥇';
                    else if (index === 1) medalIcon = '🥈';
                    else if (index === 2) medalIcon = '🥉';

                    return (
                      <div
                        key={score.id || `score-${index}`}
                        className={`grid grid-cols-12 gap-1 p-2.5 items-center text-xs font-pixel ${
                          index === 0 ? 'bg-amber-500/10 text-amber-300' : 'text-zinc-300'
                        }`}
                      >
                        <span className="col-span-2 text-center font-bold">
                          {medalIcon || `#${index + 1}`}
                        </span>
                        <span className="col-span-3 font-bold text-cyan-300">
                          {score.initials}
                        </span>
                        <span className="col-span-3 text-right text-amber-400 font-bold">
                          {String(score.score).padStart(6, '0')}
                        </span>
                        <span className="col-span-2 text-center flex items-center justify-center gap-0.5 text-[10px] text-orange-400">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>{score.streak}</span>
                        </span>
                        <span className="col-span-2 text-center text-[9px] uppercase text-zinc-400">
                          {score.difficulty.slice(0, 3)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          /* User Stats Grid */
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col items-center text-center">
              <span className="text-2xl font-pixel text-cyan-400 font-bold">{stats.gamesPlayed}</span>
              <span className="text-[10px] font-retro text-zinc-400 mt-1">Partidas Jugadas</span>
            </div>

            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col items-center text-center">
              <span className="text-2xl font-pixel text-emerald-400 font-bold">{stats.gamesWon}</span>
              <span className="text-[10px] font-retro text-zinc-400 mt-1">Victorias Totales</span>
            </div>

            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col items-center text-center">
              <span className="text-2xl font-pixel text-amber-400 font-bold">{winRate}%</span>
              <span className="text-[10px] font-retro text-zinc-400 mt-1">Tasa de Acierto</span>
            </div>

            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col items-center text-center">
              <span className="text-2xl font-pixel text-rose-400 font-bold">{stats.bestStreak}</span>
              <span className="text-[10px] font-retro text-zinc-400 mt-1">Mejor Racha Arcade</span>
            </div>

            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col items-center text-center">
              <span className="text-2xl font-pixel text-purple-400 font-bold">{stats.perfectGames}</span>
              <span className="text-[10px] font-retro text-zinc-400 mt-1">Partidas Perfectas (0 Fallos)</span>
            </div>

            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col items-center text-center">
              <span className="text-2xl font-pixel text-amber-300 font-bold">{stats.totalCoinsEarned}🪙</span>
              <span className="text-[10px] font-retro text-zinc-400 mt-1">Monedas Acumuladas</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
