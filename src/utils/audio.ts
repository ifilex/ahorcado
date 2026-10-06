/**
 * 8-Bit Web Audio API Sound Synthesizer & Chiptune Music Generator
 */

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private sfxVolume: number = 0.7;
  private musicVolume: number = 0.4;
  private musicPlaying: boolean = false;
  private musicTimer: number | null = null;
  private currentNoteIndex: number = 0;

  constructor() {
    // Lazy initialize on first interaction
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.musicPlaying) {
      this.stopMusic();
    }
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
  }

  // --- Sound Effects ---

  public playClick() {
    this.playKeyClick();
  }

  public playKeyClick() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(this.sfxVolume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // ignore audio context restrictions
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const startTime = ctx.currentTime + idx * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(this.sfxVolume * 0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.1);
      });
    } catch {
      // fallback
    }
  }

  public playError() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      // Low dual-tone buzzer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      osc1.frequency.setValueAtTime(140, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);

      osc2.frequency.setValueAtTime(130, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(75, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(this.sfxVolume * 0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.25);
      osc2.stop(ctx.currentTime + 0.25);
    } catch {
      // fallback
    }
  }

  public playCoin() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(this.sfxVolume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // fallback
    }
  }

  public playWin() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      // Fanfare sequence: C4, G4, C5, E5, G5, C6 (extended hold)
      const melody = [
        { f: 261.63, d: 0.1 },
        { f: 392.00, d: 0.1 },
        { f: 523.25, d: 0.1 },
        { f: 659.25, d: 0.12 },
        { f: 783.99, d: 0.14 },
        { f: 1046.50, d: 0.4 },
      ];

      let elapsed = 0;
      melody.forEach(note => {
        const start = ctx.currentTime + elapsed;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(this.sfxVolume * 0.35, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + note.d);
        elapsed += note.d * 0.85;
      });
    } catch {
      // fallback
    }
  }

  public playGameOver() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const melody = [
        { f: 493.88, d: 0.2 }, // B4
        { f: 466.16, d: 0.2 }, // Bb4
        { f: 440.00, d: 0.2 }, // A4
        { f: 415.30, d: 0.45 }, // Ab4
      ];

      let elapsed = 0;
      melody.forEach(note => {
        const start = ctx.currentTime + elapsed;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.f, start);
        osc.frequency.linearRampToValueAtTime(note.f * 0.95, start + note.d);

        gain.gain.setValueAtTime(this.sfxVolume * 0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + note.d);
        elapsed += note.d;
      });
    } catch {
      // fallback
    }
  }

  public playTick() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(this.sfxVolume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // ignore
    }
  }

  public playAchievement() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      arpeggio.forEach((freq, i) => {
        const start = ctx.currentTime + i * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(this.sfxVolume * 0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.18);
      });
    } catch {
      // ignore
    }
  }

  // --- Background Chiptune Synthesizer Loop ---

  public startMusic() {
    if (this.isMuted || this.musicPlaying) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.musicPlaying = true;
    this.currentNoteIndex = 0;

    // Classic catchy 8-bit chiptune theme notes
    const melodyNotes = [
      // Bar 1
      659.25, 659.25, 0, 659.25, 0, 523.25, 659.25, 0,
      783.99, 0, 0, 0, 392.00, 0, 0, 0,
      // Bar 2
      523.25, 0, 0, 392.00, 0, 0, 329.63, 0,
      0, 440.00, 0, 493.88, 466.16, 440.00, 0, 0,
      // Bar 3
      392.00, 659.25, 783.99, 880.00, 0, 698.46, 783.99, 0,
      659.25, 0, 523.25, 587.33, 493.88, 0, 0, 0,
    ];

    const bassNotes = [
      261.63, 261.63, 261.63, 261.63, 196.00, 196.00, 196.00, 196.00,
      220.00, 220.00, 220.00, 220.00, 174.61, 174.61, 174.61, 174.61,
      261.63, 261.63, 261.63, 261.63, 196.00, 196.00, 196.00, 196.00,
      220.00, 220.00, 220.00, 220.00, 196.00, 196.00, 196.00, 196.00,
    ];

    const tempoMs = 125; // 120 BPM 16th notes

    const step = () => {
      if (!this.musicPlaying) return;
      const actx = this.initCtx();
      if (!actx) return;

      const melFreq = melodyNotes[this.currentNoteIndex % melodyNotes.length];
      const bassFreq = bassNotes[this.currentNoteIndex % bassNotes.length];

      const noteDuration = 0.1;

      // Play melody voice
      if (melFreq > 0) {
        try {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(melFreq, actx.currentTime);

          gain.gain.setValueAtTime(this.musicVolume * 0.12, actx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + noteDuration);

          osc.connect(gain);
          gain.connect(actx.destination);

          osc.start(actx.currentTime);
          osc.stop(actx.currentTime + noteDuration);
        } catch {
          // ignore
        }
      }

      // Play bass voice on every 2nd tick
      if (this.currentNoteIndex % 2 === 0 && bassFreq > 0) {
        try {
          const bOsc = actx.createOscillator();
          const bGain = actx.createGain();
          bOsc.type = 'triangle';
          bOsc.frequency.setValueAtTime(bassFreq / 2, actx.currentTime);

          bGain.gain.setValueAtTime(this.musicVolume * 0.18, actx.currentTime);
          bGain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + noteDuration * 1.8);

          bOsc.connect(bGain);
          bGain.connect(actx.destination);

          bOsc.start(actx.currentTime);
          bOsc.stop(actx.currentTime + noteDuration * 1.8);
        } catch {
          // ignore
        }
      }

      this.currentNoteIndex = (this.currentNoteIndex + 1) % melodyNotes.length;
      this.musicTimer = window.setTimeout(step, tempoMs);
    };

    step();
  }

  public stopMusic() {
    this.musicPlaying = false;
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.musicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public isMusicActive(): boolean {
    return this.musicPlaying;
  }
}

export const retroAudio = new RetroAudioEngine();
