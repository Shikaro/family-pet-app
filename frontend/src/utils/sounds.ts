// Web Audio API sound effects — no external files needed
// Robust mobile/iOS unlock strategy

let ctx: AudioContext | null = null;
let isUnlocked = false;

function ensureCtx(): AudioContext {
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}

// Must be called INSIDE a user gesture (click/touch handler)
function tryUnlock() {
  if (isUnlocked) return;
  const c = ensureCtx();

  // Resume suspended context
  if (c.state === "suspended") {
    c.resume();
  }

  // Play silent buffer — the only reliable way to unlock iOS audio
  const buf = c.createBuffer(1, 1, 22050);
  const src = c.createBufferSource();
  src.buffer = buf;
  src.connect(c.destination);
  src.start(0);
  src.onended = () => {
    isUnlocked = true;
  };

  // Also mark as unlocked if context is already running
  if (c.state === "running") {
    isUnlocked = true;
  }
}

// Global listeners — these fire on EVERY touch/click to ensure unlock
if (typeof window !== "undefined") {
  const handler = () => tryUnlock();
  document.addEventListener("touchstart", handler, { passive: true });
  document.addEventListener("touchend", handler, { passive: true });
  document.addEventListener("click", handler, { passive: true });
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.3) {
  try {
    const c = ensureCtx();

    // Always try to resume
    if (c.state === "suspended") {
      c.resume();
      return; // Don't try to play while suspended — next interaction will work
    }

    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + duration);
  } catch (e) {
    // Silently fail — don't break the app over audio
  }
}

// Convenience: schedule multiple tones with delays
function playSequence(notes: Array<{ freq: number; delay: number; dur: number; type?: OscillatorType; vol?: number }>) {
  notes.forEach((n) => {
    if (n.delay === 0) {
      playTone(n.freq, n.dur, n.type || "sine", n.vol || 0.2);
    } else {
      setTimeout(() => playTone(n.freq, n.dur, n.type || "sine", n.vol || 0.2), n.delay);
    }
  });
}

export function playCoins() {
  playSequence([
    { freq: 800, delay: 0, dur: 0.15 },
    { freq: 1000, delay: 80, dur: 0.15 },
    { freq: 1200, delay: 160, dur: 0.15 },
    { freq: 1400, delay: 240, dur: 0.15 },
  ]);
}

export function playCorrect() {
  playSequence([
    { freq: 523, delay: 0, dur: 0.15, vol: 0.25 },
    { freq: 784, delay: 120, dur: 0.25, vol: 0.25 },
  ]);
}

export function playWrong() {
  playTone(200, 0.3, "square", 0.15);
}

export function playPetHappy() {
  playSequence([
    { freq: 660, delay: 0, dur: 0.12, vol: 0.15 },
    { freq: 880, delay: 100, dur: 0.12, vol: 0.15 },
    { freq: 1100, delay: 200, dur: 0.12, vol: 0.15 },
  ]);
}

export function playTap() {
  playTone(600, 0.08, "sine", 0.15);
}

export function playComplete() {
  playSequence([
    { freq: 523, delay: 0, dur: 0.2 },
    { freq: 659, delay: 120, dur: 0.2 },
    { freq: 784, delay: 240, dur: 0.2 },
    { freq: 1047, delay: 360, dur: 0.3 },
  ]);
}

export function playAchievement() {
  playSequence([
    { freq: 523, delay: 0, dur: 0.2, vol: 0.25 },
    { freq: 659, delay: 150, dur: 0.2, vol: 0.25 },
    { freq: 784, delay: 300, dur: 0.2, vol: 0.25 },
    { freq: 1047, delay: 450, dur: 0.25, vol: 0.3 },
    { freq: 1319, delay: 600, dur: 0.35, vol: 0.3 },
  ]);
}

export function initSounds() {
  // Pre-create context (will be unlocked on first user gesture)
  ensureCtx();
}
