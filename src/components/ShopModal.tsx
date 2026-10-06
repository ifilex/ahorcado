import React, { useState } from 'react';
import { ShoppingBag, Check, Lock, Sparkles, X, Shield, MapPin, Palette } from 'lucide-react';
import { CharacterSkin, CharacterSkinId, SceneryId, SceneryTheme } from '../types';
import { retroAudio } from '../utils/audio';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  skins: CharacterSkin[];
  sceneries: SceneryTheme[];
  activeSkin: CharacterSkinId;
  activeScenery: SceneryId;
  onEquipSkin: (id: CharacterSkinId) => void;
  onBuySkin: (id: CharacterSkinId, price: number) => void;
  onEquipScenery: (id: SceneryId) => void;
  onBuyScenery: (id: SceneryId, price: number) => void;
  onBonusCoins: (amount: number) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  coins,
  skins,
  sceneries,
  activeSkin,
  activeScenery,
  onEquipSkin,
  onBuySkin,
  onEquipScenery,
  onBuyScenery,
  onBonusCoins,
}) => {
  const [activeTab, setActiveTab] = useState<'skins' | 'sceneries' | 'bonus'>('skins');
  const [wheelSpinning, setWheelSpinning] = useState<boolean>(false);
  const [wheelWonAmount, setWheelWonAmount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSpinBonusWheel = () => {
    if (wheelSpinning) return;
    setWheelSpinning(true);
    setWheelWonAmount(null);
    retroAudio.playTick();

    const rewards = [50, 100, 150, 200, 300, 500];
    let counter = 0;
    const interval = setInterval(() => {
      retroAudio.playTick();
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        const won = rewards[Math.floor(Math.random() * rewards.length)];
        setWheelWonAmount(won);
        setWheelSpinning(false);
        retroAudio.playCoin();
        onBonusCoins(won);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-zinc-900 border-4 border-amber-500 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header with Coin Counter */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-400" />
            <h2 className="text-sm sm:text-base font-pixel text-amber-400">TIENDA PIXEL ARCADE</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black px-3 py-1.5 rounded-full border border-amber-500/50 text-amber-300 text-xs font-pixel">
              <span>🪙</span>
              <span>{coins}</span>
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
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 bg-black/50 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('skins');
            }}
            className={`py-2 text-[10px] sm:text-xs font-pixel rounded flex items-center justify-center gap-1.5 ${
              activeTab === 'skins' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>PERSONAJES</span>
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('sceneries');
            }}
            className={`py-2 text-[10px] sm:text-xs font-pixel rounded flex items-center justify-center gap-1.5 ${
              activeTab === 'sceneries' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>ESCENARIOS</span>
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('bonus');
            }}
            className={`py-2 text-[10px] sm:text-xs font-pixel rounded flex items-center justify-center gap-1.5 ${
              activeTab === 'bonus' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>RULETA COINS</span>
          </button>
        </div>

        {/* Skins Grid */}
        {activeTab === 'skins' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skins.map(skin => {
              const isEquipped = activeSkin === skin.id;
              const canAfford = coins >= skin.price;

              return (
                <div
                  key={skin.id}
                  className={`p-3.5 rounded-lg border-2 flex flex-col justify-between gap-2 bg-zinc-950/80 transition-all ${
                    isEquipped ? 'border-amber-400 bg-amber-950/20' : 'border-zinc-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-pixel font-bold" style={{ color: skin.accentColor }}>
                        {skin.name}
                      </span>
                      <span className="text-[10px] font-retro text-zinc-400 mt-1">
                        {skin.description}
                      </span>
                    </div>
                    {isEquipped && (
                      <span className="text-[9px] font-pixel bg-amber-500 text-black px-1.5 py-0.5 rounded">
                        EQUIPADO
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                    <span className="text-xs font-pixel text-amber-300">
                      {skin.price === 0 ? 'GRATIS' : `${skin.price} 🪙`}
                    </span>

                    {skin.unlocked ? (
                      <button
                        onClick={() => {
                          retroAudio.playClick();
                          onEquipSkin(skin.id);
                        }}
                        disabled={isEquipped}
                        className={`px-3 py-1.5 rounded text-[10px] font-pixel border pixel-btn ${
                          isEquipped
                            ? 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-800'
                        }`}
                      >
                        {isEquipped ? 'EN USO' : 'EQUIPAR'}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            retroAudio.playCoin();
                            onBuySkin(skin.id, skin.price);
                          } else {
                            retroAudio.playError();
                          }
                        }}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded text-[10px] font-pixel border pixel-btn flex items-center gap-1 ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-800'
                            : 'bg-zinc-800 text-zinc-500 border-zinc-700 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <Lock className="w-3 h-3" />
                        <span>COMPRAR</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Sceneries Grid */}
        {activeTab === 'sceneries' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sceneries.map(scene => {
              const isEquipped = activeScenery === scene.id;
              const canAfford = coins >= scene.price;

              return (
                <div
                  key={scene.id}
                  className={`p-3.5 rounded-lg border-2 flex flex-col justify-between gap-2 bg-zinc-950/80 transition-all ${
                    isEquipped ? 'border-amber-400 bg-amber-950/20' : 'border-zinc-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-pixel font-bold" style={{ color: scene.accentColor }}>
                        {scene.name}
                      </span>
                      <span className="text-[10px] font-retro text-zinc-400 mt-1">
                        {scene.description}
                      </span>
                    </div>
                    {isEquipped && (
                      <span className="text-[9px] font-pixel bg-amber-500 text-black px-1.5 py-0.5 rounded">
                        EQUIPADO
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                    <span className="text-xs font-pixel text-amber-300">
                      {scene.price === 0 ? 'GRATIS' : `${scene.price} 🪙`}
                    </span>

                    {scene.unlocked ? (
                      <button
                        onClick={() => {
                          retroAudio.playClick();
                          onEquipScenery(scene.id);
                        }}
                        disabled={isEquipped}
                        className={`px-3 py-1.5 rounded text-[10px] font-pixel border pixel-btn ${
                          isEquipped
                            ? 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-default'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-800'
                        }`}
                      >
                        {isEquipped ? 'EN USO' : 'EQUIPAR'}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (canAfford) {
                            retroAudio.playCoin();
                            onBuyScenery(scene.id, scene.price);
                          } else {
                            retroAudio.playError();
                          }
                        }}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded text-[10px] font-pixel border pixel-btn flex items-center gap-1 ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-black border-amber-800'
                            : 'bg-zinc-800 text-zinc-500 border-zinc-700 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <Lock className="w-3 h-3" />
                        <span>COMPRAR</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bonus Wheel */}
        {activeTab === 'bonus' && (
          <div className="p-6 bg-zinc-950 border-2 border-amber-500/50 rounded-xl flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-amber-500/10 rounded-full border-2 border-amber-400/30 animate-pulse">
              <Sparkles className="w-10 h-10 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-pixel text-amber-400">RULETA DE MONEDAS ARCADE</h3>
              <p className="text-xs font-retro text-zinc-400 mt-1 max-w-sm">
                ¡Gira la ruleta de la suerte para obtener monedas extra y desbloquear contenido exclusivo!
              </p>
            </div>

            {wheelWonAmount !== null && (
              <div className="p-3 bg-emerald-950 border-2 border-emerald-500 rounded-lg text-emerald-300 font-pixel text-sm animate-bounce">
                🎉 ¡HAS GANADO +{wheelWonAmount} MONEDAS PIXEL!
              </div>
            )}

            <button
              onClick={handleSpinBonusWheel}
              disabled={wheelSpinning}
              className={`px-6 py-3.5 rounded-xl font-pixel text-xs sm:text-sm font-bold border-3 pixel-btn ${
                wheelSpinning
                  ? 'bg-zinc-700 text-zinc-400 border-zinc-800 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-black border-amber-800 shadow-xl animate-pulse'
              }`}
            >
              {wheelSpinning ? '🎰 GIRANDO...' : '🎰 ¡GIRAR RULETA GRATIS!'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
