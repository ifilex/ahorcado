import React from 'react';
import { Sparkles, Trophy, X, Check } from 'lucide-react';
import { Achievement } from '../types';
import { retroAudio } from '../utils/audio';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  onClaimReward: (id: string, coins: number) => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
  onClaimReward,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-zinc-900 border-4 border-emerald-500 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-sm sm:text-base font-pixel text-emerald-400">LOGROS & TROFEOS</h2>
              <span className="text-[10px] font-retro text-zinc-400">
                Desbloqueados: {unlockedCount} / {achievements.length}
              </span>
            </div>
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

        {/* List of achievements */}
        <div className="flex flex-col gap-2.5">
          {achievements.map(ach => {
            const percent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

            return (
              <div
                key={ach.id}
                className={`p-3 rounded-lg border-2 flex items-center justify-between gap-3 transition-all ${
                  ach.unlocked
                    ? 'bg-emerald-950/30 border-emerald-500/80 shadow-md'
                    : 'bg-zinc-950/60 border-zinc-800 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl sm:text-3xl p-2 rounded-lg border-2 ${
                    ach.unlocked 
                      ? 'bg-emerald-500/20 border-emerald-400' 
                      : 'bg-zinc-900 border-zinc-800 grayscale'
                  }`}>
                    {ach.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-pixel font-bold ${
                      ach.unlocked ? 'text-emerald-300' : 'text-zinc-300'
                    }`}>
                      {ach.title}
                    </span>
                    <span className="text-[10px] font-retro text-zinc-400 mt-0.5">
                      {ach.description}
                    </span>

                    {/* Progress bar */}
                    {!ach.unlocked && (
                      <div className="w-36 sm:w-48 bg-zinc-800 h-2 rounded-full overflow-hidden mt-1.5 border border-zinc-700">
                        <div
                          className="bg-emerald-500 h-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-pixel text-amber-300">
                    +{ach.rewardCoins}🪙
                  </span>
                  {ach.unlocked ? (
                    <span className="px-2 py-1 bg-emerald-600 text-white text-[9px] font-pixel rounded flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>COMPLETO</span>
                    </span>
                  ) : (
                    <span className="text-[9px] font-retro text-zinc-500">
                      {ach.progress}/{ach.maxProgress}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
