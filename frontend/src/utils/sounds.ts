// Web Audio API sound effects — no external files needed

let ctx: AudioContext | null = null;
let unlocked = false;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return ctx;
}

// Unlock audio on first user interaction (required for mobile/iOS)
function unlockAudio() {
  if (unlocked) return;
  const c = getCtx();
  if (c.state === "suspended") {
    c.resume().then(() => {
      unlocked = true;
    });
  } else {
    unlocked = true;
  }
  // Play silent buffer to fully unlock on iOS
  try {
    const buf = c.createBuffer(1, 1, 22050);
    const src = c.createBufferSource();
    src.buffer = buf;
    src.connect(c.destination);
    src.start(0);
  } catch {}
}

// Attach global listeners
if (typeof window !== "undefined") {
  const events = ["touchstart", "touchend", "click", "keydown"];
  events.forEach((evt) => {
    document.addEventListener(evt, unlockAudio, { passive: true });
  });
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.3) {
  try {
    const c = getCtx();
    // Try to resume if suspended (don't skip — queue the sound)
    if (c.state === "suspended") {
      c.resume();
    }
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    gain.gain.exponentialRampToValueAtTime(0.01, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  } catch {}
}

export function playCoins() {
  [800, 1000, 1200, 1400].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.15, "sine", 0.2), i * 80);
  });
}

export function playCorrect() {
  playTone(523, 0.15, "sine", 0.25);
  setTimeout(() => playTone(784, 0.25, "sine", 0.25), 120);
}

export function playWrong() {
  playTone(200, 0.3, "square", 0.15);
}

export function playPetHappy() {
  [660, 880, 1100].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.12, "sine", 0.15), i * 100);
  });
}

export function playTap() {
  playTone(600, 0.08, "sine", 0.15);
}

export function playComplete() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.2, "sine", 0.2), i * 120);
  });
}

// Jingle for new achievement
export function playAchievement() {
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.25, "sine", 0.25), i * 150);
  });
}

export function initSounds() {
  getCtx();
  unlockAudio();
}
