// Web Audio API sound effects — no external files needed

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Resume if suspended (mobile browsers require user gesture)
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

// Resume audio on first user interaction (required for mobile)
function ensureAudioReady() {
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
}

// Attach global listener once
if (typeof window !== "undefined") {
  const resume = () => {
    if (ctx && ctx.state === "suspended") ctx.resume();
  };
  document.addEventListener("touchstart", resume, { once: false, passive: true });
  document.addEventListener("click", resume, { once: false, passive: true });
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.3) {
  try {
    const c = getCtx();
    if (c.state === "suspended") return; // Can't play yet
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
  // Звон монеток — восходящие ноты
  [800, 1000, 1200, 1400].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.15, "sine", 0.2), i * 80);
  });
}

export function playCorrect() {
  // Правильный ответ — два восходящих тона
  playTone(523, 0.15, "sine", 0.25);
  setTimeout(() => playTone(784, 0.25, "sine", 0.25), 120);
}

export function playWrong() {
  // Неправильный ответ — низкий буззер
  playTone(200, 0.3, "square", 0.15);
}

export function playPetHappy() {
  // Питомец доволен — мелодичные ноты
  [660, 880, 1100].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.12, "sine", 0.15), i * 100);
  });
}

export function playTap() {
  // Лёгкий тап
  playTone(600, 0.08, "sine", 0.15);
}

export function playComplete() {
  // Задание выполнено — фанфара
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.2, "sine", 0.2), i * 120);
  });
}

// Инициализация при первом вызове — создаём контекст заранее
export function initSounds() {
  getCtx();
}
