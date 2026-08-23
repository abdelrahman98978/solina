// Pure Web Audio API synthesized realistic engine sound effects

class SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a UI click or feedback sound
  public playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio context may be blocked by browser policy
    }
  }

  // Engine Start & Rev Simulator
  public playEngineSound(type: 'v6' | 'hybrid' | 'gr' | 'diesel' = 'v6') {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === 'hybrid') {
        // Futuristic EV chime + gentle hum
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.4);
        osc1.frequency.exponentialRampToValueAtTime(660, now + 1.2);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(220, now);
        osc2.frequency.linearRampToValueAtTime(110, now + 1.5);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.8);
        osc2.stop(now + 1.8);
        return;
      }

      // Starter crank + Deep roar + rev
      const noiseBuffer = this.createNoiseBuffer(2.5);
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(150, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(600, now + 0.5);
      noiseFilter.frequency.exponentialRampToValueAtTime(180, now + 1.8);

      const oscLow = this.ctx.createOscillator();
      oscLow.type = type === 'gr' ? 'sawtooth' : 'triangle';
      
      const baseFreq = type === 'gr' ? 65 : type === 'diesel' ? 42 : 55;
      oscLow.frequency.setValueAtTime(baseFreq * 0.7, now);
      oscLow.frequency.linearRampToValueAtTime(baseFreq * 2.2, now + 0.6); // Crank & Rev
      oscLow.frequency.linearRampToValueAtTime(baseFreq * 1.1, now + 1.2); // Idle settle
      oscLow.frequency.exponentialRampToValueAtTime(baseFreq, now + 2.4);

      const mainGain = this.ctx.createGain();
      mainGain.gain.setValueAtTime(0.01, now);
      mainGain.gain.linearRampToValueAtTime(0.35, now + 0.4);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      noise.connect(noiseFilter);
      noiseFilter.connect(mainGain);
      oscLow.connect(mainGain);
      mainGain.connect(this.ctx.destination);

      noise.start(now);
      oscLow.start(now);
      noise.stop(now + 2.4);
      oscLow.stop(now + 2.4);
    } catch {
      // Audio context fail-safe
    }
  }

  private createNoiseBuffer(duration: number): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext missing');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

export const soundEngine = new SoundEngine();
