// Web Audio API Sound Synthesizer for Futuristic UI/UX
// Zero external assets, instant 60 FPS performance, lightweight & clean

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (this.enabled) this.playTone(800, 0.05, 'sine');
    return this.enabled;
  }

  playTone(freq = 440, duration = 0.1, type = 'sine', gainVal = 0.03) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Ignore audio context errors gracefully
    }
  }

  // Preset UI sounds
  playHover() {
    this.playTone(520, 0.04, 'sine', 0.02);
  }

  playClick() {
    this.playTone(880, 0.08, 'triangle', 0.04);
  }

  playThemeSwitch() {
    if (!this.enabled) return;
    this.playTone(300, 0.1, 'sawtooth', 0.02);
    setTimeout(() => this.playTone(600, 0.1, 'sine', 0.03), 60);
    setTimeout(() => this.playTone(1200, 0.15, 'sine', 0.03), 120);
  }

  playSuccess() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.12, 'sine', 0.04), idx * 70);
    });
  }
}

export const soundFx = new SoundManager();
