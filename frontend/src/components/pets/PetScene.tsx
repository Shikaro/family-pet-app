import { useState, useRef } from "react";
import { Pet } from "../../types";
import { playTap, playPetHappy } from "../../utils/sounds";

const PET_EMOJIS: Record<string, string> = {
  cat: "🐱",
  dog: "🐶",
  hamster: "🐹",
  parrot: "🦜",
  rabbit: "🐰",
  turtle: "🐢",
  dino: "🦕",
};

const MOOD_FACES: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  hungry: "😋",
  sleepy: "😴",
};

interface Props {
  pet: Pet;
  onTap: () => void;
  onSwipeUp: () => void;
}

export default function PetScene({ pet, onTap, onSwipeUp }: Props) {
  const [animation, setAnimation] = useState<string>("");
  const [particles, setParticles] = useState<string[]>([]);
  const touchStartY = useRef(0);

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
      // Свайп вверх — кормить
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
    onTap();
  };

  // Цвет фона зависит от настроения
  const bgColor = pet.happiness > 70
    ? "linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 100%)"
    : pet.happiness > 40
    ? "linear-gradient(180deg, #fff9c4 0%, #fff176 100%)"
    : "linear-gradient(180deg, #ffccbc 0%, #ef9a9a 100%)";

  return (
    <div
      className={`pet-scene ${animation}`}
      style={{ background: bgColor }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Облака / декор */}
      <div className="pet-scene-bg">
        <span className="cloud c1">☁️</span>
        <span className="cloud c2">☁️</span>
      </div>

      {/* Питомец */}
      <div className={`pet-character ${animation}`}>
        <span className="pet-emoji">{PET_EMOJIS[pet.type] || "🐾"}</span>
      </div>

      {/* Настроение */}
      <div className="pet-mood-bubble">
        {MOOD_FACES[pet.mood] || "😊"}
      </div>

      {/* Частицы при взаимодействии */}
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
