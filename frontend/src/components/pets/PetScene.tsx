import { useState, useRef, useEffect, useCallback } from "react";
import { Pet } from "../../types";
import { playTap, playPetHappy } from "../../utils/sounds";

// Крупные эмодзи-модели питомцев
const PET_EMOJIS: Record<string, string> = {
  cat: "🐱", dog: "🐶", hamster: "🐹", parrot: "🦜",
  rabbit: "🐰", turtle: "🐢", dino: "🦕",
};

const MOOD_FACES: Record<string, string> = {
  happy: "😊", neutral: "😐", sad: "😢", hungry: "😋", sleepy: "😴",
};

// Фразы по настроениям — более разнообразные
const SPEECH: Record<string, string[]> = {
  happy: ["Ура!", "Играем!", "🎵", "Люблю!", "Хи-хи!", "Ла-ла-ла!", "Я счастлив!", "Обнимашки!"],
  neutral: ["Хм...", "Мур~", "О!", "Ну-ну...", "Эхе-хе"],
  sad: ["Грустно...", "Мне скучно", "Поиграй со мной", "😿"],
  hungry: ["Ням-ням?", "Есть хочу!", "🍎?", "Кушать!", "Голодный..."],
  sleepy: ["Zzz...", "Хрр...", "Спать...", "💤", "Зевает~"],
};

// Фоны-аксессуары
const BG_STYLES: Record<string, { bg: string; ground: string; extras: string[] }> = {
  bg_space: { bg: "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", ground: "#1a1a2e", extras: ["⭐", "🌙", "✨", "🪐"] },
  bg_forest: { bg: "linear-gradient(180deg, #2d5016 0%, #4a7c23 50%, #6b8f3c 100%)", ground: "#3d6b1e", extras: ["🌲", "🌿", "🍄", "🦋"] },
  bg_beach: { bg: "linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #F0E68C 100%)", ground: "#F4D03F", extras: ["🏖️", "🐚", "🌊", "☀️"] },
  bg_castle: { bg: "linear-gradient(180deg, #4a4969 0%, #7474BF 50%, #C6C6E5 100%)", ground: "#6b6b8d", extras: ["🏰", "⚔️", "🛡️", "🏳️"] },
  bg_rainbow: { bg: "linear-gradient(180deg, #ff9a9e 0%, #fecfef 25%, #fdfcfb 50%, #a8edea 75%, #fed6e3 100%)", ground: "#b8f0b8", extras: ["🌈", "☁️", "🦄", "💫"] },
};

const ACC_EMOJIS: Record<string, string> = {
  hat_crown: "👑", hat_cap: "🧢", hat_wizard: "🎩", hat_flower: "🌸", hat_party: "🎉",
  glasses_sun: "🕶️", glasses_nerd: "🤓", glasses_star: "⭐",
  collar_bow: "🎀", collar_bell: "🔔", collar_star: "✨",
  wings_angel: "😇", wings_dragon: "🐉", wings_butterfly: "🦋",
};

const ACC_SLOTS: Record<string, string> = {
  hat_crown: "hat", hat_cap: "hat", hat_wizard: "hat", hat_flower: "hat", hat_party: "hat",
  glasses_sun: "glasses", glasses_nerd: "glasses", glasses_star: "glasses",
  collar_bow: "collar", collar_bell: "collar", collar_star: "collar",
  wings_angel: "wings", wings_dragon: "wings", wings_butterfly: "wings",
};

interface Props {
  pet: Pet;
  onTap: () => void;
  onSwipeUp: () => void;
}

export default function PetScene({ pet, onTap, onSwipeUp }: Props) {
  const [particles, setParticles] = useState<string[]>([]);
  const [posX, setPosX] = useState(50);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [action, setAction] = useState<"idle" | "walk" | "jump" | "sleep" | "wiggle" | "celebrate">("idle");
  const [speechBubble, setSpeechBubble] = useState("");
  const [eyeState, setEyeState] = useState<"open" | "blink" | "squint">("open");
  const [tapScale, setTapScale] = useState(1);
  const touchStartY = useRef(0);

  // Моргание — случайное, как Duolingo
  useEffect(() => {
    const blink = () => {
      setEyeState("blink");
      setTimeout(() => setEyeState("open"), 150);
    };
    const id = setInterval(() => {
      if (Math.random() > 0.3) blink();
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  // Случайные действия — более разнообразные
  useEffect(() => {
    const doAction = () => {
      const mood = pet.mood;
      const pool: typeof action[] =
        mood === "sleepy" ? ["idle", "idle", "sleep"]
        : mood === "happy" ? ["walk", "jump", "wiggle", "walk", "idle"]
        : mood === "hungry" ? ["idle", "wiggle", "idle"]
        : ["walk", "idle", "wiggle", "idle"];

      const next = pool[Math.floor(Math.random() * pool.length)];

      if (next === "walk") {
        const newDir = Math.random() > 0.5 ? "right" : "left";
        const target = newDir === "right"
          ? Math.min(75, posX + 10 + Math.random() * 15)
          : Math.max(25, posX - 10 - Math.random() * 15);
        setDirection(newDir);
        setAction("walk");
        const steps = 25;
        const dx = (target - posX) / steps;
        let step = 0;
        const iv = setInterval(() => {
          step++;
          setPosX((p) => p + dx);
          if (step >= steps) { clearInterval(iv); setAction("idle"); }
        }, 40);
      } else if (next === "jump") {
        setAction("jump");
        setTimeout(() => setAction("idle"), 700);
      } else if (next === "wiggle") {
        setAction("wiggle");
        // Случайная фраза
        const phrases = SPEECH[mood] || SPEECH.neutral;
        setSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
        setTimeout(() => { setAction("idle"); setSpeechBubble(""); }, 2500);
      } else if (next === "sleep") {
        setAction("sleep");
        setSpeechBubble("💤");
        setTimeout(() => { setAction("idle"); setSpeechBubble(""); }, 4000);
      }
    };

    const id = setInterval(doAction, 2500 + Math.random() * 3000);
    return () => clearInterval(id);
  }, [pet.mood, posX]);

  const showParticles = useCallback((emojis: string[]) => {
    setParticles(emojis);
    setTimeout(() => setParticles([]), 1200);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) {
      setAction("celebrate");
      showParticles(["🍎", "🥕", "🍪", "🍕", "🧁"]);
      setSpeechBubble("Вкусняшка!");
      playPetHappy();
      setTimeout(() => { setAction("idle"); setSpeechBubble(""); }, 1000);
      onSwipeUp();
    }
  };

  const handleClick = () => {
    setTapScale(1.25);
    setTimeout(() => setTapScale(1), 200);
    setAction("celebrate");
    showParticles(["💖", "⭐", "✨", "💕", "🌟"]);
    setEyeState("squint"); // Щурится от радости
    setSpeechBubble("Ура!");
    playTap();
    if (navigator.vibrate) navigator.vibrate(40);
    setTimeout(() => {
      setAction("idle");
      setEyeState("open");
      setSpeechBubble("");
    }, 800);
    onTap();
  };

  // Фон
  const accessories = pet.accessories || [];
  const bgKey = accessories.find((a) => a.startsWith("bg_"));
  const bgStyle = bgKey && BG_STYLES[bgKey]
    ? BG_STYLES[bgKey]
    : {
        bg: pet.happiness > 70
          ? "linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 40%, #a5d6a7 100%)"
          : pet.happiness > 40
          ? "linear-gradient(180deg, #fff9c4 0%, #fff59d 40%, #fff176 100%)"
          : "linear-gradient(180deg, #ffcdd2 0%, #ef9a9a 100%)",
        ground: pet.happiness > 70 ? "#66bb6a" : pet.happiness > 40 ? "#dce775" : "#ef9a9a",
        extras: ["☁️", "☁️", "🌤️"],
      };

  // Аксессуары
  const hatKey = accessories.find((a) => ACC_SLOTS[a] === "hat");
  const glassesKey = accessories.find((a) => ACC_SLOTS[a] === "glasses");
  const collarKey = accessories.find((a) => ACC_SLOTS[a] === "collar");
  const wingsKey = accessories.find((a) => ACC_SLOTS[a] === "wings");

  // CSS-класс анимации
  const animClass =
    action === "walk" ? "ps-walk" :
    action === "jump" ? "ps-jump" :
    action === "wiggle" ? "ps-wiggle" :
    action === "sleep" ? "ps-sleep" :
    action === "celebrate" ? "ps-celebrate" :
    "ps-breathe";

  // Фильтр по настроению
  const moodFilter =
    pet.mood === "sad" ? "saturate(0.6)" :
    pet.mood === "hungry" ? "saturate(0.7) brightness(0.95)" :
    pet.mood === "sleepy" ? "brightness(0.9)" :
    "none";

  return (
    <div
      className="ps-scene"
      style={{ background: bgStyle.bg }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Фоновые декорации */}
      <div className="ps-bg-layer">
        {bgStyle.extras.map((e, i) => (
          <span key={i} className={`ps-deco ps-d${i}`}>{e}</span>
        ))}
      </div>

      {/* Земля */}
      <div className="ps-ground" style={{ backgroundColor: bgStyle.ground }}>
        {/* Травинки/детали */}
        <span className="ps-grass g1">🌱</span>
        <span className="ps-grass g2">🌱</span>
        <span className="ps-grass g3">🌿</span>
      </div>

      {/* === ПИТОМЕЦ === */}
      <div
        className="ps-pet-wrap"
        style={{
          left: `${posX}%`,
          transform: `translateX(-50%) ${direction === "left" ? "scaleX(-1)" : ""}`,
          filter: moodFilter,
        }}
      >
        {/* Тень под питомцем */}
        <div className={`ps-shadow ${animClass}`} />

        {/* Контейнер с аксессуарами */}
        <div className="ps-pet-body-wrap" style={{ transform: `scale(${tapScale})`, transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          {/* Крылья — за спиной */}
          {wingsKey && <span className="ps-acc ps-wings">{ACC_EMOJIS[wingsKey]}</span>}

          {/* Шляпа */}
          {hatKey && <span className="ps-acc ps-hat">{ACC_EMOJIS[hatKey]}</span>}

          {/* Основной эмодзи питомца */}
          <div className={`ps-pet ${animClass}`}>
            <span className="ps-emoji">{PET_EMOJIS[pet.type] || "🐾"}</span>
          </div>

          {/* Глаза / моргание — накладка */}
          {eyeState === "blink" && <div className="ps-blink-overlay" />}
          {eyeState === "squint" && <div className="ps-squint-overlay">😆</div>}

          {/* Очки */}
          {glassesKey && <span className="ps-acc ps-glasses">{ACC_EMOJIS[glassesKey]}</span>}

          {/* Ошейник */}
          {collarKey && <span className="ps-acc ps-collar">{ACC_EMOJIS[collarKey]}</span>}
        </div>

        {/* Речевой пузырь */}
        {speechBubble && (
          <div className="ps-bubble">
            <span>{speechBubble}</span>
          </div>
        )}
      </div>

      {/* Настроение */}
      <div className="ps-mood">{MOOD_FACES[pet.mood] || "😊"}</div>

      {/* Частицы */}
      {particles.length > 0 && (
        <div className="ps-particles">
          {particles.map((p, i) => (
            <span key={i} className={`ps-p ps-p${i}`}>{p}</span>
          ))}
        </div>
      )}

      {/* Подсказка */}
      <div className="ps-hint">Нажми — поиграть · Свайп ↑ — покормить</div>
    </div>
  );
}
