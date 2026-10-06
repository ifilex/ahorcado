import React from 'react';
import { Settings, Volume2, Music, Monitor, Smartphone, Palette, X, RotateCcw, Globe } from 'lucide-react';
import { GameSettings, LanguageId, PaletteId } from '../types';
import { retroAudio } from '../utils/audio';
import { SUPPORTED_LANGUAGES, t } from '../utils/i18n';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onResetAllData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetAllData,
}) => {
  if (!isOpen) return null;

  const lang = settings.language || 'es';

  const handleToggle = (key: keyof GameSettings, subKey?: keyof GameSettings['sound']) => {
    retroAudio.playClick();
    if (subKey && key === 'sound') {
      const currentVal = settings.sound[subKey];
      const updated = {
        ...settings,
        sound: {
          ...settings.sound,
          [subKey]: !currentVal,
        },
      };
      if (subKey === 'sfxEnabled') {
        retroAudio.setMuted(!currentVal);
      }
      if (subKey === 'musicEnabled') {
        if (!currentVal) retroAudio.startMusic();
        else retroAudio.stopMusic();
      }
      onUpdateSettings(updated);
    } else {
      onUpdateSettings({
        ...settings,
        [key]: !settings[key as keyof GameSettings],
      });
    }
  };

  const handlePaletteChange = (palette: PaletteId) => {
    retroAudio.playCoin();
    onUpdateSettings({ ...settings, palette });
  };

  const handleLanguageChange = (newLang: LanguageId) => {
    retroAudio.playCoin();
    onUpdateSettings({ ...settings, language: newLang });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-zinc-900 border-4 border-indigo-500 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            <h2 className="text-sm sm:text-base font-pixel text-indigo-400">{t('settings', lang)}</h2>
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

        {/* Language Selector (9 Languages) */}
        <div className="flex flex-col gap-2 p-3 bg-black/50 border border-zinc-800 rounded-lg">
          <span className="text-xs font-pixel text-amber-400 flex items-center gap-1.5">
            <Globe className="w-4 h-4" />
            <span>{t('language', lang)}</span>
          </span>

          <div className="grid grid-cols-3 gap-1.5">
            {SUPPORTED_LANGUAGES.map(l => {
              const isSelected = lang === l.id;
              return (
                <button
                  key={l.id}
                  id={`settings-lang-${l.id}`}
                  onClick={() => handleLanguageChange(l.id)}
                  className={`p-2 rounded-lg border-2 text-center flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-amber-500 border-amber-300 text-black font-bold scale-[1.02] shadow-md'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  <span className="text-[10px] font-pixel truncate">{l.nativeName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio Toggles */}
        <div className="flex flex-col gap-2.5 p-3 bg-black/50 border border-zinc-800 rounded-lg">
          <span className="text-xs font-pixel text-indigo-300">AUDIO & SFX 8-BIT</span>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-retro text-zinc-300 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{t('soundFx', lang)}</span>
            </span>
            <button
              onClick={() => handleToggle('sound', 'sfxEnabled')}
              className={`px-3 py-1 text-[10px] font-pixel rounded border pixel-btn ${
                settings.sound.sfxEnabled
                  ? 'bg-emerald-600 border-emerald-800 text-white font-bold'
                  : 'bg-zinc-800 border-zinc-950 text-zinc-500'
              }`}
            >
              {settings.sound.sfxEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-retro text-zinc-300 flex items-center gap-1.5">
              <Music className="w-4 h-4 text-purple-400" />
              <span>{t('music8bit', lang)}</span>
            </span>
            <button
              onClick={() => handleToggle('sound', 'musicEnabled')}
              className={`px-3 py-1 text-[10px] font-pixel rounded border pixel-btn ${
                settings.sound.musicEnabled
                  ? 'bg-emerald-600 border-emerald-800 text-white font-bold'
                  : 'bg-zinc-800 border-zinc-950 text-zinc-500'
              }`}
            >
              {settings.sound.musicEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-retro text-zinc-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>{t('haptics', lang)}</span>
            </span>
            <button
              onClick={() => handleToggle('sound', 'vibration')}
              className={`px-3 py-1 text-[10px] font-pixel rounded border pixel-btn ${
                settings.sound.vibration
                  ? 'bg-emerald-600 border-emerald-800 text-white font-bold'
                  : 'bg-zinc-800 border-zinc-950 text-zinc-500'
              }`}
            >
              {settings.sound.vibration ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Video & Display Effects */}
        <div className="flex flex-col gap-2.5 p-3 bg-black/50 border border-zinc-800 rounded-lg">
          <span className="text-xs font-pixel text-indigo-300">DISPLAY & CRT FX</span>

          <div className="flex items-center justify-between">
            <span className="text-xs font-retro text-zinc-300 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span>{t('scanlines', lang)}</span>
            </span>
            <button
              onClick={() => handleToggle('crtScanlines')}
              className={`px-3 py-1 text-[10px] font-pixel rounded border pixel-btn ${
                settings.crtScanlines
                  ? 'bg-indigo-600 border-indigo-800 text-white font-bold'
                  : 'bg-zinc-800 border-zinc-950 text-zinc-500'
              }`}
            >
              {settings.crtScanlines ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-retro text-zinc-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-rose-400" />
              <span>{t('screenShake', lang)}</span>
            </span>
            <button
              onClick={() => handleToggle('screenShake')}
              className={`px-3 py-1 text-[10px] font-pixel rounded border pixel-btn ${
                settings.screenShake
                  ? 'bg-indigo-600 border-indigo-800 text-white font-bold'
                  : 'bg-zinc-800 border-zinc-950 text-zinc-500'
              }`}
            >
              {settings.screenShake ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Color Palette themes */}
        <div className="flex flex-col gap-2 p-3 bg-black/50 border border-zinc-800 rounded-lg">
          <span className="text-xs font-pixel text-indigo-300 flex items-center gap-1">
            <Palette className="w-4 h-4" />
            <span>{t('colorPalette', lang)}</span>
          </span>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'arcade_amber', name: 'Arcade Gold', desc: '1980s Retro', color: 'border-amber-500 text-amber-300' },
              { id: 'cyber_neon', name: 'Cyber Neon', desc: 'Magenta & Cyan', color: 'border-pink-500 text-pink-300' },
              { id: 'gameboy_green', name: 'GameBoy 1989', desc: 'Matrix LCD', color: 'border-emerald-500 text-emerald-300' },
              { id: 'pico_sunset', name: 'PICO-8 Sunset', desc: 'Pixel Twilight', color: 'border-rose-500 text-rose-300' },
            ].map(p => {
              const isSelected = settings.palette === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePaletteChange(p.id as PaletteId)}
                  className={`p-2.5 rounded-lg border-2 text-left flex flex-col gap-0.5 transition-all ${
                    isSelected
                      ? `bg-zinc-800 ${p.color} font-bold scale-[1.02]`
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-[10px] font-pixel">{p.name}</span>
                  <span className="text-[9px] font-retro opacity-70">{p.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Danger Zone: Reset */}
        <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
          <span className="text-[10px] font-retro text-zinc-500">{t('resetData', lang)}</span>
          <button
            onClick={() => {
              if (window.confirm(t('resetPrompt', lang))) {
                onResetAllData();
                retroAudio.playGameOver();
              }
            }}
            className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 rounded text-rose-300 text-[9px] font-pixel flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('resetData', lang)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
