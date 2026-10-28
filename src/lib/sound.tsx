import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

// Small synthesized sound system -- no audio files (nothing licensed to use),
// everything generated with the Web Audio API: a soft evolving ambient pad
// plus short tone "blips" for interaction feedback. Off by default; browsers
// require a user gesture to start audio anyway, which the toggle provides.

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  playClick: () => void;
  playHover: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playTone = useCallback((ctx: AudioContext, freq: number, duration: number, type: OscillatorType, peak: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(peak, ctx.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.05);
  }, []);

  const playClick = useCallback(() => {
    if (!enabled) return;
    playTone(getCtx(), 640, 0.14, 'sine', 0.05);
  }, [enabled, getCtx, playTone]);

  const playHover = useCallback(() => {
    if (!enabled) return;
    playTone(getCtx(), 920, 0.07, 'sine', 0.018);
  }, [enabled, getCtx, playTone]);

  const startAmbient = useCallback((ctx: AudioContext) => {
    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.022, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    filter.connect(master);

    const root = ctx.createOscillator();
    root.type = 'sine';
    root.frequency.value = 110;
    const fifth = ctx.createOscillator();
    fifth.type = 'sine';
    fifth.frequency.value = 164.81;
    root.connect(filter);
    fifth.connect(filter);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 50;
    lfo.connect(lfoGain).connect(filter.frequency);

    root.start();
    fifth.start();
    lfo.start();

    ambientRef.current = {
      stop: () => {
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(master.gain.value, now);
        master.gain.linearRampToValueAtTime(0, now + 0.8);
        setTimeout(() => {
          root.stop();
          fifth.stop();
          lfo.stop();
        }, 900);
      },
    };
  }, []);

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      const ctx = getCtx();
      if (next) startAmbient(ctx);
      else {
        ambientRef.current?.stop();
        ambientRef.current = null;
      }
      return next;
    });
  }, [getCtx, startAmbient]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, playClick, playHover }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
