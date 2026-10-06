import React, { useState } from 'react';
import { HelpCircle, Terminal, Volume2, Send, CheckCircle2, X } from 'lucide-react';
import { retroAudio } from '../utils/audio';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'soundtest' | 'ticket'>('guide');
  const [ticketSubject, setTicketSubject] = useState<string>('');
  const [ticketMessage, setTicketMessage] = useState<string>('');
  const [ticketSubmitted, setTicketSubmitted] = useState<boolean>(false);
  const [techResponse, setTechResponse] = useState<string>('');

  if (!isOpen) return null;

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    retroAudio.playSuccess();
    setTicketSubmitted(true);

    // Simulated 8-bit support response
    const responses = [
      'SYS-OP 1984: Ticket recibido con éxito en el búfer central. Diagnóstico: El cartucho virtual y la memoria EEPROM local están funcionando al 100%. ¡Gracias por tu reporte!',
      'CONTROLADOR ARCADE: Petición procesada. Se ha verificado la integridad de la base de datos de palabras y los sintetizadores Web Audio API. Tu consulta ha quedado registrada.',
      'SOPORTE 8-BIT: Registro guardado. Si experimentas problemas de sonido en navegadores móviles, recuerda interactuar con la pantalla una vez para habilitar el AudioContext.',
    ];
    setTechResponse(responses[Math.floor(Math.random() * responses.length)]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-zinc-900 border-4 border-zinc-600 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 text-zinc-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-zinc-300" />
            <h2 className="text-sm sm:text-base font-pixel text-zinc-200">SYS-OP / SOPORTE Y GUÍA</h2>
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
        <div className="grid grid-cols-3 gap-2 bg-black/50 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('guide');
            }}
            className={`py-2 text-[10px] sm:text-xs font-pixel rounded flex items-center justify-center gap-1 ${
              activeTab === 'guide' ? 'bg-zinc-700 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GUÍA</span>
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('soundtest');
            }}
            className={`py-2 text-[10px] sm:text-xs font-pixel rounded flex items-center justify-center gap-1 ${
              activeTab === 'soundtest' ? 'bg-zinc-700 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>SOUND TEST</span>
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveTab('ticket');
            }}
            className={`py-2 text-[10px] sm:text-xs font-pixel rounded flex items-center justify-center gap-1 ${
              activeTab === 'ticket' ? 'bg-zinc-700 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SOPORTE</span>
          </button>
        </div>

        {/* 1. Guide Tab */}
        {activeTab === 'guide' && (
          <div className="flex flex-col gap-3 text-xs font-retro text-zinc-300">
            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col gap-1.5">
              <span className="font-pixel text-amber-400 text-xs">🎯 REGLAS DEL JUEGO</span>
              <p>
                Adivina la palabra oculta letra por letra antes de que se complete el personaje en la horca. Puedes pulsar las teclas en pantalla o utilizar el teclado físico de tu dispositivo.
              </p>
            </div>

            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col gap-1.5">
              <span className="font-pixel text-emerald-400 text-xs">🕹️ MODOS DE JUEGO</span>
              <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                <li><strong className="text-zinc-200">Modo Arcade:</strong> Racha infinita de palabras con dificultad progresiva y multiplicador de monedas.</li>
                <li><strong className="text-zinc-200">Duelo 1 vs 1:</strong> Desafía a un amigo en el mismo dispositivo escribiendo palabras secretas por turnos.</li>
                <li><strong className="text-zinc-200">Reto Asíncrono:</strong> Comparte códigos con amigos y compite contra sus fantasmas en tiempo real.</li>
                <li><strong className="text-zinc-200">Desafío Diario:</strong> Una palabra secreta única por día con doble recompensa.</li>
              </ul>
            </div>

            <div className="p-3 bg-black/60 border border-zinc-800 rounded-lg flex flex-col gap-1.5">
              <span className="font-pixel text-cyan-400 text-xs">🪙 MONEDAS Y RECOMPENSAS</span>
              <p>
                Gana monedas pixel en cada victoria, racha y logro para desbloquear trajes (caballero, ninja, astronauta, mago) y escenarios (mazmorra, cyberpunk, cosmos).
              </p>
            </div>
          </div>
        )}

        {/* 2. Interactive Sound Test Tab */}
        {activeTab === 'soundtest' && (
          <div className="flex flex-col gap-3">
            <div className="text-xs font-pixel text-zinc-300 text-center">
              🔊 TABLERO DE PRUEBA DE AUDIO 8-BIT
            </div>
            <p className="text-[11px] font-retro text-zinc-400 text-center">
              Prueba los sintetizadores de ondas cuadradas y triangulares de Web Audio API:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              <button
                onClick={() => retroAudio.playKeyClick()}
                className="p-3 bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-950 rounded text-xs font-pixel pixel-btn"
              >
                🖱️ Pulsación
              </button>
              <button
                onClick={() => retroAudio.playSuccess()}
                className="p-3 bg-emerald-900/60 hover:bg-emerald-800 border-2 border-emerald-950 rounded text-xs font-pixel text-emerald-300 pixel-btn"
              >
                ✨ Acierto
              </button>
              <button
                onClick={() => retroAudio.playError()}
                className="p-3 bg-rose-900/60 hover:bg-rose-800 border-2 border-rose-950 rounded text-xs font-pixel text-rose-300 pixel-btn"
              >
                💥 Fallo
              </button>
              <button
                onClick={() => retroAudio.playCoin()}
                className="p-3 bg-amber-900/60 hover:bg-amber-800 border-2 border-amber-950 rounded text-xs font-pixel text-amber-300 pixel-btn"
              >
                🪙 Moneda
              </button>
              <button
                onClick={() => retroAudio.playWin()}
                className="p-3 bg-indigo-900/60 hover:bg-indigo-800 border-2 border-indigo-950 rounded text-xs font-pixel text-indigo-300 pixel-btn"
              >
                🎺 Fanfarria
              </button>
              <button
                onClick={() => retroAudio.playGameOver()}
                className="p-3 bg-zinc-950 hover:bg-zinc-800 border-2 border-zinc-800 rounded text-xs font-pixel text-zinc-400 pixel-btn"
              >
                💀 Game Over
              </button>
              <button
                onClick={() => retroAudio.playAchievement()}
                className="p-3 bg-purple-900/60 hover:bg-purple-800 border-2 border-purple-950 rounded text-xs font-pixel text-purple-300 pixel-btn"
              >
                🏆 Logro
              </button>
              <button
                onClick={() => retroAudio.playTick()}
                className="p-3 bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-950 rounded text-xs font-pixel pixel-btn"
              >
                ⏱️ Tick
              </button>
              <button
                onClick={() => retroAudio.toggleMusic()}
                className="p-3 bg-amber-500 hover:bg-amber-400 text-black border-2 border-amber-800 rounded text-xs font-pixel pixel-btn font-bold"
              >
                🎵 Chiptune
              </button>
            </div>
          </div>
        )}

        {/* 3. Ticket / Support Tab */}
        {activeTab === 'ticket' && (
          <div className="flex flex-col gap-3">
            {ticketSubmitted ? (
              <div className="p-4 bg-zinc-950 border-2 border-emerald-500 rounded-xl flex flex-col gap-3 animate-fade-in font-retro text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-pixel">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>TICKET ENVIADO AL SYS-OP</span>
                </div>
                <div className="p-3 bg-black border border-zinc-800 rounded font-mono text-[11px] text-green-400">
                  {techResponse}
                </div>
                <button
                  onClick={() => {
                    setTicketSubmitted(false);
                    setTicketSubject('');
                    setTicketMessage('');
                  }}
                  className="self-start px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] font-pixel text-zinc-300"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendTicket} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-pixel text-zinc-300">ASUNTO:</label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={e => setTicketSubject(e.target.value)}
                    placeholder="Ej: Consulta de audio o sugerencia de palabra"
                    className="px-3 py-2 bg-zinc-950 border-2 border-zinc-700 rounded text-xs font-retro text-zinc-200 focus:border-zinc-400 outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-pixel text-zinc-300">DESCRIPCIÓN:</label>
                  <textarea
                    rows={3}
                    value={ticketMessage}
                    onChange={e => setTicketMessage(e.target.value)}
                    placeholder="Describe aquí tu consulta o reporte técnico..."
                    className="px-3 py-2 bg-zinc-950 border-2 border-zinc-700 rounded text-xs font-retro text-zinc-200 focus:border-zinc-400 outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-pixel text-xs rounded-lg border-2 border-zinc-900 pixel-btn font-bold flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR TICKET AL SOPORTE TÉCNICO</span>
                </button>
              </form>
            )}

            {/* System Diagnostics Info */}
            <div className="p-3 bg-black/40 border border-zinc-800 rounded text-[10px] font-mono text-zinc-500 flex flex-col gap-0.5">
              <span>SYS_ENGINE: WebAudio Sintetizador v2.4</span>
              <span>RENDER_MODE: Canvas 2D Pixelated (320x240)</span>
              <span>ESTADO_RED: Sincronización Local / Ghost Ready</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
