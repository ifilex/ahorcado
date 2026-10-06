import React, { useEffect, useState } from 'react';
import { Ghost } from 'lucide-react';
import { GhostChallengeData } from '../types';

interface GhostHudProps {
  ghostData: GhostChallengeData;
  playerMistakes: number;
  playerGuessedCount: number;
  totalLettersCount: number;
  isWon: boolean;
  isGameOver: boolean;
}

export const GhostHud: React.FC<GhostHudProps> = ({
  ghostData,
  playerMistakes,
  playerGuessedCount,
  totalLettersCount,
  isWon,
  isGameOver,
}) => {
  const [ghostProgress, setGhostProgress] = useState<number>(10);
  const [ghostStatus, setGhostStatus] = useState<string>('Pensando letra...');

  useEffect(() => {
    if (isWon || isGameOver) return;

    // Simulate ghost competitor progressing over time
    const interval = setInterval(() => {
      setGhostProgress(prev => {
        const next = Math.min(100, prev + Math.floor(Math.random() * 8) + 2);
        if (next < 40) setGhostStatus('Adivinando consonantes...');
        else if (next < 80) setGhostStatus('¡Está cerca de resolver!');
        else if (next < 100) setGhostStatus('¡Casi lo tiene!');
        else setGhostStatus('¡El fantasma completó la palabra!');
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isWon, isGameOver]);

  const playerPercent = Math.min(100, Math.round((playerGuessedCount / totalLettersCount) * 100));

  return (
    <div className="w-full max-w-xl mx-auto p-2.5 bg-purple-950/40 border-2 border-purple-500/60 rounded-lg flex flex-col gap-2 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-purple-300 text-xs font-pixel">
          <Ghost className="w-4 h-4 text-purple-400 animate-bounce" />
          <span>FANTASMA: {ghostData.creatorName}</span>
        </div>
        <span className="text-[10px] font-retro text-purple-200">{ghostStatus}</span>
      </div>

      {/* Duel progress bars */}
      <div className="flex flex-col gap-1.5 text-[9px] font-pixel">
        {/* Player bar */}
        <div className="flex items-center gap-2">
          <span className="w-16 text-emerald-400">TÚ:</span>
          <div className="flex-1 bg-black/60 h-3 rounded-full overflow-hidden border border-emerald-600/40">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${playerPercent}%` }}
            />
          </div>
          <span className="text-zinc-300">{playerPercent}%</span>
        </div>

        {/* Ghost bar */}
        <div className="flex items-center gap-2">
          <span className="w-16 text-purple-400">RIVAL:</span>
          <div className="flex-1 bg-black/60 h-3 rounded-full overflow-hidden border border-purple-600/40">
            <div
              className="bg-purple-500 h-full transition-all duration-500"
              style={{ width: `${ghostProgress}%` }}
            />
          </div>
          <span className="text-zinc-300">{ghostProgress}%</span>
        </div>
      </div>
    </div>
  );
};
