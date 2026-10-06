import React from 'react';
import { Calendar, Sparkles, Check, Gift, Bell, X, Play } from 'lucide-react';
import { DailyQuest } from '../types';
import { retroAudio } from '../utils/audio';

interface DailyEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: DailyQuest[];
  dailyStreak: number;
  hasDailyCompleted: boolean;
  onStartDailyWord: () => void;
  onClaimQuest: (questId: string, reward: number) => void;
}

export const DailyEventsModal: React.FC<DailyEventsModalProps> = ({
  isOpen,
  onClose,
  quests,
  dailyStreak,
  hasDailyCompleted,
  onStartDailyWord,
  onClaimQuest,
}) => {
  if (!isOpen) return null;

  const todayFormatted = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-zinc-900 border-4 border-rose-500 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-rose-400" />
            <div>
              <h2 className="text-sm sm:text-base font-pixel text-rose-400">EVENTO & DESAFÍO DIARIO</h2>
              <span className="text-[10px] font-retro text-zinc-400 capitalize">{todayFormatted}</span>
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

        {/* 1. Daily Mystery Word Card */}
        <div className="p-4 bg-gradient-to-br from-rose-950/50 to-zinc-950 border-2 border-rose-500/60 rounded-xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌟</span>
              <div className="flex flex-col">
                <span className="text-xs font-pixel text-rose-300 font-bold">PALABRA SECRETA DEL DÍA</span>
                <span className="text-[10px] font-retro text-zinc-400">Misma palabra para todos los jugadores hoy</span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-amber-500 text-black text-[9px] font-pixel rounded">
              RECOMPENSA x2
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-rose-900/40">
            <div className="text-[10px] font-pixel text-amber-300">
              Premio: +200 🪙 Monedas Pixel
            </div>
            {hasDailyCompleted ? (
              <span className="px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-500 rounded text-[10px] font-pixel flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>COMPLETADO HOY</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  retroAudio.playSuccess();
                  onStartDailyWord();
                }}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-black font-pixel text-xs rounded-lg border-2 border-rose-800 pixel-btn font-bold flex items-center gap-1.5 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>JUGAR AHORA</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. 7-Day Login Streak Calendar */}
        <div className="flex flex-col gap-2 p-3 bg-black/50 border-2 border-zinc-800 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-pixel text-amber-400">CALENDARIO DE RACHA (DÍA {dailyStreak}/7)</span>
            <span className="text-[10px] font-retro text-zinc-400">¡Conéctate cada día!</span>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-1">
            {[50, 75, 100, 150, 200, 300, 500].map((reward, idx) => {
              const dayNum = idx + 1;
              const isPast = dayNum <= dailyStreak;
              const isCurrent = dayNum === dailyStreak;

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`p-1.5 sm:p-2 rounded border flex flex-col items-center justify-center text-center transition-all ${
                    isPast
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                  }`}
                >
                  <span className="text-[8px] sm:text-[9px] font-pixel">D{dayNum}</span>
                  <Gift className={`w-3 h-3 my-0.5 ${isPast ? 'text-amber-400' : 'text-zinc-600'}`} />
                  <span className="text-[7px] sm:text-[8px] font-pixel">+{reward}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Daily Quests Log */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-pixel text-zinc-300">MISIONES DIARIAS:</span>

          <div className="flex flex-col gap-2">
            {quests.map(q => {
              const isDone = q.current >= q.target;

              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-lg border-2 flex items-center justify-between gap-2 ${
                    q.claimed 
                      ? 'bg-zinc-950/60 border-zinc-800 opacity-60' 
                      : isDone 
                      ? 'bg-emerald-950/40 border-emerald-500' 
                      : 'bg-zinc-950 border-zinc-800'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-pixel text-zinc-200">{q.title}</span>
                    <span className="text-[10px] font-retro text-zinc-400">{q.description}</span>
                    <div className="text-[9px] font-pixel text-amber-400 mt-1">
                      Progreso: {q.current} / {q.target}
                    </div>
                  </div>

                  <div>
                    {q.claimed ? (
                      <span className="text-[9px] font-pixel text-zinc-500">RECLAMADO</span>
                    ) : isDone ? (
                      <button
                        onClick={() => {
                          retroAudio.playCoin();
                          onClaimQuest(q.id, q.rewardCoins);
                        }}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-[9px] font-pixel rounded border border-amber-800 pixel-btn animate-bounce"
                      >
                        RECLAMAR +{q.rewardCoins}🪙
                      </button>
                    ) : (
                      <span className="text-[9px] font-pixel text-amber-300">+{q.rewardCoins}🪙</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
