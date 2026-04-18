import { useState, useRef, useEffect } from "react";
import { Pet } from "../../types";
import { playTap, playPetHappy } from "../../utils/sounds";

const PET_EMOJIS: Record<string, string> = {
  cat: "🐱", dog: "🐶", hamster: "🐹", parrot: "🦜",
  rabbit: "🐰", turtle: "🐢", dino: "🦕",
};

const MOOD_FACES: Record<string, string> = {
  happy: "😊", neutral: "😐", sad: "😢", hungry: "😋", sleepy: "😴",
};

// Фоны для аксессуаров
const BG_STYLES: Record<string, { bg: string; ground: string; extras: string[] }> = {
  bg_space: { bg: "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", ground: "#1a1a2e", extras: ["⭐", "🌙", "✨", "🪐"] },
  bg_forest: { bg: "linear-gradient(180deg, #2d5016 0%, #4a7c23 50%, #6b8f3c 100%)", ground: "#3d6b1e", extras: ["🌲", "🌿", "🍄", "🦋"] },
  bg_beach: { bg: "linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #F0E68C 100%)", ground: "#F4D03F", extras: ["🏖️", "🐚", "🌊", "☀️"] },
  bg_castle: { bg: "linear-gradient(180deg, #4a4969 0%, #7474BF 50%, #C6C6E5 100%)", ground: "#6b6b8d", extras: ["🏰", "⚔️", "🛡️", "🏳️"] },
  bg_rainbow: { bg: "linear-gradient(180deg, #ff9a9e 0%, #fecfef 25%, #fdfcfb 50%, #a8edea 75%, #fed6e3 100%)", ground: "#b8f0b8", extras: ["🌈", "☁️", "🦄", "💫"] },
};

// Слот-эмодзи аксессуаров для отрисовки на питомце
const ACCESSORY_EMOJIS: Record<string, string> = {
  hat_crown: "👑", hat_cap: "🧢", hat_wizard: "🎩", hat_flower: "🌸", hat_party: "🎉",
  glasses_sun: "🕶️", glasses_nerd: "🤓", glasses_star: "⭐",
  collar_bow: "🎀", collar_bell: "🔔", collar_star: "✨",
  wings_angel: "😇", wings_dragon: "🐉", wings_butterfly: "🦋",
};

const ACCESSORY_SLOTS: Record<string, string> = {
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
  const [animation, setAnimation] = useState<string>("");
  const [particles, setParticles] = useState<string[]>([]);
  const [posX, setPosX] = useState(50); // % позиция по X
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [action, setAction] = useState<"idle" | "walk" | "jump" | "sleep" | "sniff">("idle");
  const [speechBubble, setSpeechBubble] = useState<string>("");
  const touchStartY = useRef(0);
  const moveTimer = useRef<any>(null);

  // Случайные действия питомца
  useEffect(() => {
    const doRandomAction = () => {
      const mood = pet.mood;
      const actions: Array<"walk" | "jump" | "sniff" | "idle"> =
        mood === "sleepy" ? ["idle", "idle", "idle"]
        : mood === "happy" ? ["walk", "jump", "sniff", "walk", "idle"]
        : ["walk", "idle", "sniff", "idle"];

      const nextAction = actions[Math.floor(Math.random() * actions.length)];

      if (nextAction === "walk") {
        // Питомец бежит в случайную точку
        const newDir = Math.random() > 0.5 ? "right" : "left";
        const target = newDir === "right"
          ? Math.min(80, posX + 15 + Math.random() * 20)
          : Math.max(20, posX - 15 - Math.random() * 20);
        setDirection(newDir);
        setAction("walk");
        // Плавное перемещение
        const steps = 20;
        const dx = (target - posX) / steps;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          setPosX((prev) => prev + dx);
          if (step >= steps) {
            clearInterval(interval);
            setAction("idle");
          }
        }, 50);
      } else if (nextAction === "jump") {
        setAction("jump");
        setTimeout(() => setAction("idle"), 600);
      } else if (nextAction === "sniff") {
        setAction("sniff");
        // Случайная фраза
        const phrases = mood === "happy"
          ? ["Ура!", "Играем!", "🎵", "Люблю!", "Хи-хи!"]
          : mood === "hungry" ? ["Есть хочу...", "Ням?", "🍎?"]
          : ["...", "Мур~", "Zzz"];
        setSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
        setTimeout(() => {
          setAction("idle");
          setSpeechBubble("");
        }, 2000);
      }
    };

    moveTimer.current = setInterval(doRandomAction, 3000 + Math.random() * 3000);
    return () => clearInterval(moveTimer.current);
  }, [pet.mood, posX]);

  const triggerAnimation = (type: string) => {
    setAnimation(type);
    setTimeout(() => setAnimation(""), 600);
  };

  const showParticles = (emojis: string[]) => {
    setParticles(emojis);
    setTimeout(() => setParticles([]), 1000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) {
      triggerAnimation("feed");
      showParticles(["🍎", "🥕", "🍪"]);
      playPetHappy();
      onSwipeUp();
    }
  };

  const handleClick = () => {
    triggerAnimation("bounce");
    showParticles(["💖", "⭐", "✨"]);
    playTap();
    setAction("jump");
    setTimeout(() => setAction("idle"), 500);
    onTap();
  };

  // Определяем фон — аксессуар или дефолт по настроению
  const accessories = pet.accessories || [];
  const bgKey = accessories.find((a) => a.startsWith("bg_"));
  const bgStyle = bgKey && BG_STYLES[bgKey]
    ? BG_STYLES[bgKey]
    : {
        bg: pet.happiness > 70
          ? "linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 100%)"
          : pet.happiness > 40
          ? "linear-gradient(180deg, #fff9c4 0%, #fff176 100%)"
          : "linear-gradient(180deg, #ffccbc 0%, #ef9a9a 100%)",
        ground: pet.happiness > 70 ? "#81c784" : pet.happiness > 40 ? "#dce775" : "#ef9a9a",
        extras: ["☁️", "☁️"],
      };

  // Аксессуары на питомце
  const hatKey = accessories.find((a) => ACCESSORY_SLOTS[a] === "hat");
  const glassesKey = accessories.find((a) => ACCESSORY_SLOTS[a] === "glasses");
  const collarKey = accessories.find((a) => ACCESSORY_SLOTS[a] === "collar");
  const wingsKey = accessories.find((a) => ACCESSORY_SLOTS[a] === "wings");

  const petAnimClass =
    action === "walk" ? "pet-walking" :
    action === "jump" ? "pet-jumping" :
    action === "sniff" ? "pet-sniffing" :
    action === "sleep" ? "pet-sleeping" :
    animation ? animation : "pet-idle";

  return (
    <div
      className="pet-scene"
      style={{ background: bgStyle.bg }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Декоративные элементы фона */}
      <div className="pet-scene-bg">
        {bgStyle.extras.map((e, i) => (
          <span key={i} className={`scene-deco d${i}`}>{e}</span>
        ))}
      </div>

      {/* Земля / пол */}
      <div className="pet-ground" style={{ backgroundColor: bgStyle.ground }} />

      {/* Питомец — двигается по экрану */}
      <div
        className={`pet-character-wrap`}
        style={{
          left: `${posX}%`,
          transform: `translateX(-50%) ${direction === "left" ? "scaleX(-1)" : ""}`,
        }}
      >
        {/* Крылья (за спиной) */}
        {wingsKey && (
          <span className="acc-wings">{ACCESSORY_EMOJIS[wingsKey]}</span>
        )}

        {/* Шляпа */}
        {hatKey && (
          <span className="acc-hat">{ACCESSORY_EMOJIS[hatKey]}</span>
        )}

        {/* Питомец */}
        <div className={`pet-body ${petAnimClass}`}>
          <span className="pet-emoji">{PET_EMOJIS[pet.type] || "🐾"}</span>
        </div>

        {/* Очки */}
        {glassesKey && (
          <span className="acc-glasses">{ACCESSORY_EMOJIS[glassesKey]}</span>
        )}

        {/* Ошейник */}
        {collarKey && (
          <span className="acc-collar">{ACCESSORY_EMOJIS[collarKey]}</span>
        )}

        {/* Речевой пузырь */}
        {speechBubble && (
          <div className="pet-speech">{speechBubble}</div>
        )}
      </div>

      {/* Настроение */}
      <div className="pet-mood-bubble">
        {MOOD_FACES[pet.mood] || "😊"}
      </div>

      {/* Частицы */}
      {particles.length > 0 && (
        <div className="pet-particles">
          {particles.map((p, i) => (
            <span key={i} className={`particle p${i}`}>{p}</span>
          ))}
        </div>
      )}

      {/* Подсказка */}
      <div className="pet-hint">
        Нажми — поиграть · Свайп ↑ — покормить
      </div>
    </div>
  );
}
