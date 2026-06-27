/**
 * Web Audio API helper for retro 8-bit Sound Effects (SFX)
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

// Play a classic NES-style "Quest Completed" double beep
export function playQuestCompleteSfx() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser security)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  // First high note
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'square'; // Classic chiptune sound
  osc1.frequency.setValueAtTime(587.33, now); // D5
  gain1.gain.setValueAtTime(0.025, now);
  gain1.gain.exponentialRampToValueAtTime(0.005, now + 0.15);
  
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.15);

  // Second higher note (perfect fifth/octave jump)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'square';
  osc2.frequency.setValueAtTime(880.00, now + 0.12); // A5
  gain2.gain.setValueAtTime(0.025, now + 0.12);
  gain2.gain.exponentialRampToValueAtTime(0.005, now + 0.35);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.12);
  osc2.stop(now + 0.35);
}

// Play a classic leveling-up fanfare
export function playLevelUpSfx() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const notes = [
    { freq: 261.63, time: 0 },      // C4
    { freq: 329.63, time: 0.1 },    // E4
    { freq: 392.00, time: 0.2 },    // G4
    { freq: 523.25, time: 0.3 },    // C5
    { freq: 659.25, time: 0.45 },   // E5
    { freq: 1046.50, time: 0.6 }    // C6 (Triumphant long note)
  ];

  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle'; // Smoother tone for the melody, mixed with square
    osc.frequency.setValueAtTime(note.freq, now + note.time);
    
    gain.gain.setValueAtTime(0.035, now + note.time);
    if (note.time === 0.6) {
      gain.gain.exponentialRampToValueAtTime(0.005, now + note.time + 0.6);
      osc.start(now + note.time);
      osc.stop(now + note.time + 0.6);
    } else {
      gain.gain.exponentialRampToValueAtTime(0.005, now + note.time + 0.15);
      osc.start(now + note.time);
      osc.stop(now + note.time + 0.15);
    }
    
    osc.connect(gain);
    gain.connect(ctx.destination);
  });
}

// Play a negative error sound (e.g. locked node clicked)
export function playLockedSfx() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sawtooth'; // Buzz sound
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
  
  gain.gain.setValueAtTime(0.035, now);
  gain.gain.exponentialRampToValueAtTime(0.005, now + 0.15);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}
