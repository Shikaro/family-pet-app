// SVG-иллюстрации предметов для сцены питомца
// Каждый предмет — inline SVG в едином мультяшном стиле

export function HouseKennel() {
  return (
    <svg viewBox="0 0 80 70" className="ps-svg-item ps-svg-house">
      {/* Стены */}
      <rect x="12" y="30" width="56" height="38" rx="3" fill="#b5651d" />
      <rect x="15" y="33" width="50" height="32" rx="2" fill="#d4915e" />
      {/* Крыша */}
      <polygon points="5,32 40,5 75,32" fill="#8B4513" />
      <polygon points="10,32 40,10 70,32" fill="#a0522d" />
      {/* Дверь */}
      <ellipse cx="40" cy="58" rx="12" ry="14" fill="#5c3310" />
      <ellipse cx="40" cy="58" rx="9" ry="11" fill="#3d2106" />
      {/* Окно */}
      <rect x="50" y="38" width="10" height="10" rx="2" fill="#87CEEB" opacity="0.8" />
      <line x1="55" y1="38" x2="55" y2="48" stroke="#a0522d" strokeWidth="1.5" />
      <line x1="50" y1="43" x2="60" y2="43" stroke="#a0522d" strokeWidth="1.5" />
    </svg>
  );
}

export function HouseCastle() {
  return (
    <svg viewBox="0 0 90 80" className="ps-svg-item ps-svg-house">
      {/* Основание */}
      <rect x="15" y="30" width="60" height="48" rx="2" fill="#9e9e9e" />
      <rect x="18" y="33" width="54" height="42" rx="1" fill="#bdbdbd" />
      {/* Башни */}
      <rect x="10" y="15" width="18" height="63" fill="#9e9e9e" />
      <rect x="62" y="15" width="18" height="63" fill="#9e9e9e" />
      {/* Зубцы */}
      {[10,16,22].map(x => <rect key={x} x={x} y="10" width="4" height="8" fill="#757575" />)}
      {[62,68,74].map(x => <rect key={x} x={x} y="10" width="4" height="8" fill="#757575" />)}
      {/* Дверь */}
      <path d="M35,78 L35,55 Q45,45 55,55 L55,78 Z" fill="#5d4037" />
      {/* Окна */}
      <rect x="22" y="40" width="8" height="10" rx="4" fill="#87CEEB" opacity="0.7" />
      <rect x="60" y="40" width="8" height="10" rx="4" fill="#87CEEB" opacity="0.7" />
      {/* Флаги */}
      <line x1="19" y1="10" x2="19" y2="2" stroke="#555" strokeWidth="1" />
      <polygon points="19,2 28,5 19,8" fill="#e53935" />
      <line x1="71" y1="10" x2="71" y2="2" stroke="#555" strokeWidth="1" />
      <polygon points="71,2 80,5 71,8" fill="#e53935" />
    </svg>
  );
}

export function HouseTent() {
  return (
    <svg viewBox="0 0 70 60" className="ps-svg-item ps-svg-house">
      <polygon points="35,5 70,58 0,58" fill="#e8a735" />
      <polygon points="35,10 62,55 8,55" fill="#f0c060" />
      <polygon points="35,55 28,55 35,35 42,55" fill="#5c3310" />
      <line x1="35" y1="5" x2="35" y2="0" stroke="#8B4513" strokeWidth="2" />
      <polygon points="35,0 42,3 35,5" fill="#e53935" />
    </svg>
  );
}

export function HouseIgloo() {
  return (
    <svg viewBox="0 0 80 55" className="ps-svg-item ps-svg-house">
      <ellipse cx="40" cy="45" rx="38" ry="28" fill="#e3f2fd" />
      <ellipse cx="40" cy="45" rx="34" ry="24" fill="#f5f5f5" />
      {/* Блоки */}
      <path d="M10,40 Q25,20 40,18 Q55,20 70,40" fill="none" stroke="#bbdefb" strokeWidth="1" />
      <path d="M15,48 Q28,32 40,30 Q52,32 65,48" fill="none" stroke="#bbdefb" strokeWidth="1" />
      {/* Вход */}
      <ellipse cx="40" cy="52" rx="10" ry="8" fill="#90caf9" />
      <ellipse cx="40" cy="52" rx="7" ry="6" fill="#42a5f5" />
    </svg>
  );
}

export function HouseNest() {
  return (
    <svg viewBox="0 0 70 45" className="ps-svg-item ps-svg-house-small">
      <ellipse cx="35" cy="32" rx="32" ry="14" fill="#8d6e63" />
      <ellipse cx="35" cy="30" rx="28" ry="11" fill="#a1887f" />
      <ellipse cx="35" cy="28" rx="22" ry="8" fill="#d7ccc8" />
      {/* Веточки */}
      <line x1="5" y1="28" x2="15" y2="22" stroke="#6d4c41" strokeWidth="2" />
      <line x1="55" y1="22" x2="65" y2="28" stroke="#6d4c41" strokeWidth="2" />
    </svg>
  );
}

export function ToyBone() {
  return (
    <svg viewBox="0 0 55 25" className="ps-svg-item ps-svg-ground">
      <g transform="rotate(-15, 27, 12)">
        <rect x="14" y="8" width="27" height="9" rx="4" fill="#f5deb3" />
        <circle cx="12" cy="8" r="6" fill="#f5deb3" />
        <circle cx="12" cy="17" r="6" fill="#f5deb3" />
        <circle cx="43" cy="8" r="6" fill="#f5deb3" />
        <circle cx="43" cy="17" r="6" fill="#f5deb3" />
        <rect x="14" y="8" width="27" height="9" rx="4" fill="#ffe4b5" />
        <circle cx="12" cy="8" r="5" fill="#ffe4b5" />
        <circle cx="12" cy="17" r="5" fill="#ffe4b5" />
        <circle cx="43" cy="8" r="5" fill="#ffe4b5" />
        <circle cx="43" cy="17" r="5" fill="#ffe4b5" />
      </g>
    </svg>
  );
}

export function ToyBall() {
  return (
    <svg viewBox="0 0 30 30" className="ps-svg-item ps-svg-ground-sm">
      <circle cx="15" cy="15" r="13" fill="#ef5350" />
      <circle cx="15" cy="15" r="11" fill="#f44336" />
      <path d="M8,8 Q15,5 22,8" fill="none" stroke="#ffcdd2" strokeWidth="2" opacity="0.6" />
      <circle cx="11" cy="10" r="2" fill="#ffcdd2" opacity="0.4" />
    </svg>
  );
}

export function ToyMouse() {
  return (
    <svg viewBox="0 0 40 25" className="ps-svg-item ps-svg-ground-sm">
      <ellipse cx="22" cy="15" rx="15" ry="9" fill="#bdbdbd" />
      <ellipse cx="22" cy="15" rx="13" ry="7" fill="#e0e0e0" />
      <circle cx="10" cy="10" r="5" fill="#e0e0e0" />
      <circle cx="10" cy="10" r="4" fill="#f5f5f5" />
      <circle cx="8" cy="12" r="1.5" fill="#333" />
      <path d="M35,15 Q42,10 38,18" fill="none" stroke="#bdbdbd" strokeWidth="1.5" />
    </svg>
  );
}

export function ToyFrisbee() {
  return (
    <svg viewBox="0 0 35 15" className="ps-svg-item ps-svg-ground-sm">
      <ellipse cx="17" cy="8" rx="16" ry="6" fill="#42a5f5" />
      <ellipse cx="17" cy="7" rx="12" ry="4" fill="#64b5f6" />
      <ellipse cx="17" cy="6" rx="6" ry="2" fill="#90caf9" />
    </svg>
  );
}

export function ToyTeddy() {
  return (
    <svg viewBox="0 0 35 40" className="ps-svg-item ps-svg-ground">
      {/* Уши */}
      <circle cx="10" cy="8" r="6" fill="#a1887f" />
      <circle cx="25" cy="8" r="6" fill="#a1887f" />
      <circle cx="10" cy="8" r="4" fill="#d7ccc8" />
      <circle cx="25" cy="8" r="4" fill="#d7ccc8" />
      {/* Голова */}
      <circle cx="17" cy="15" r="11" fill="#bcaaa4" />
      {/* Тело */}
      <ellipse cx="17" cy="30" rx="10" ry="10" fill="#bcaaa4" />
      {/* Мордочка */}
      <ellipse cx="17" cy="18" rx="5" ry="3" fill="#d7ccc8" />
      <circle cx="14" cy="13" r="1.5" fill="#333" />
      <circle cx="20" cy="13" r="1.5" fill="#333" />
      <circle cx="17" cy="16" r="1.5" fill="#5d4037" />
    </svg>
  );
}

export function BowlBasic() {
  return (
    <svg viewBox="0 0 40 22" className="ps-svg-item ps-svg-ground-sm">
      <ellipse cx="20" cy="18" rx="18" ry="4" fill="#795548" />
      <path d="M3,12 Q3,20 20,20 Q37,20 37,12 Z" fill="#8d6e63" />
      <ellipse cx="20" cy="12" rx="17" ry="5" fill="#a1887f" />
      <ellipse cx="20" cy="12" rx="14" ry="3.5" fill="#6d4c41" />
    </svg>
  );
}

export function BowlGolden() {
  return (
    <svg viewBox="0 0 40 22" className="ps-svg-item ps-svg-ground-sm">
      <ellipse cx="20" cy="18" rx="18" ry="4" fill="#c6930a" />
      <path d="M3,12 Q3,20 20,20 Q37,20 37,12 Z" fill="#e6ac00" />
      <ellipse cx="20" cy="12" rx="17" ry="5" fill="#ffd54f" />
      <ellipse cx="20" cy="12" rx="14" ry="3.5" fill="#c6930a" />
      <ellipse cx="15" cy="10" rx="2" ry="1" fill="#fff9c4" opacity="0.5" />
    </svg>
  );
}

export function BowlFountain() {
  return (
    <svg viewBox="0 0 45 35" className="ps-svg-item ps-svg-ground">
      {/* База */}
      <ellipse cx="22" cy="30" rx="20" ry="5" fill="#78909c" />
      <path d="M4,25 Q4,32 22,32 Q40,32 40,25 Z" fill="#90a4ae" />
      <ellipse cx="22" cy="25" rx="18" ry="5" fill="#b0bec5" />
      <ellipse cx="22" cy="25" rx="15" ry="3.5" fill="#64b5f6" />
      {/* Фонтан */}
      <rect x="20" y="15" width="4" height="12" fill="#90a4ae" />
      {/* Капли */}
      <path d="M22,15 Q18,8 15,14" fill="none" stroke="#64b5f6" strokeWidth="1.5" />
      <path d="M22,15 Q26,8 29,14" fill="none" stroke="#64b5f6" strokeWidth="1.5" />
      <circle cx="15" cy="14" r="1" fill="#64b5f6" />
      <circle cx="29" cy="14" r="1" fill="#64b5f6" />
    </svg>
  );
}

export function BedPillow() {
  return (
    <svg viewBox="0 0 55 25" className="ps-svg-item ps-svg-ground">
      <ellipse cx="27" cy="18" rx="26" ry="7" fill="#7986cb" />
      <ellipse cx="27" cy="16" rx="24" ry="8" fill="#9fa8da" />
      <ellipse cx="27" cy="14" rx="20" ry="6" fill="#c5cae9" />
      {/* Складки */}
      <path d="M12,14 Q17,10 22,14" fill="none" stroke="#9fa8da" strokeWidth="1" opacity="0.6" />
      <path d="M30,14 Q35,10 40,14" fill="none" stroke="#9fa8da" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function BedHammock() {
  return (
    <svg viewBox="0 0 60 35" className="ps-svg-item ps-svg-ground">
      {/* Столбики */}
      <rect x="5" y="5" width="3" height="28" fill="#8d6e63" />
      <rect x="52" y="5" width="3" height="28" fill="#8d6e63" />
      {/* Гамак */}
      <path d="M8,10 Q30,30 52,10" fill="#81c784" stroke="#66bb6a" strokeWidth="1.5" />
      <path d="M8,10 Q30,26 52,10" fill="#a5d6a7" />
      {/* Верёвки */}
      <line x1="6" y1="5" x2="8" y2="10" stroke="#6d4c41" strokeWidth="1" />
      <line x1="54" y1="5" x2="52" y2="10" stroke="#6d4c41" strokeWidth="1" />
    </svg>
  );
}

export function BedBasket() {
  return (
    <svg viewBox="0 0 55 28" className="ps-svg-item ps-svg-ground">
      <path d="M5,10 Q5,26 27,26 Q50,26 50,10 Z" fill="#a1887f" />
      <path d="M8,10 Q8,23 27,23 Q47,23 47,10 Z" fill="#d7ccc8" />
      <ellipse cx="27" cy="10" rx="22" ry="5" fill="#bcaaa4" />
      {/* Плетение */}
      <path d="M10,15 L20,20 L30,15 L40,20 L47,15" fill="none" stroke="#8d6e63" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

// Растения для фона
export function Plant({ variant = 0 }: { variant?: number }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 30 50" className="ps-svg-plant">
        <rect x="13" y="25" width="4" height="25" fill="#6d4c41" />
        <ellipse cx="15" cy="18" rx="12" ry="16" fill="#66bb6a" />
        <ellipse cx="15" cy="15" rx="9" ry="12" fill="#81c784" />
        <ellipse cx="15" cy="12" rx="5" ry="8" fill="#a5d6a7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 25 45" className="ps-svg-plant">
      <rect x="11" y="22" width="3" height="23" fill="#6d4c41" />
      <path d="M12,22 Q2,15 5,5 Q10,12 12,10 Q14,12 19,5 Q22,15 12,22" fill="#4caf50" />
      <path d="M12,18 Q6,12 8,5 Q11,10 12,8 Q13,10 16,5 Q18,12 12,18" fill="#66bb6a" />
    </svg>
  );
}

// Маппинг ключей к компонентам
export const HOUSE_COMPONENTS: Record<string, () => JSX.Element> = {
  house_kennel: HouseKennel,
  house_castle: HouseCastle,
  house_tent: HouseTent,
  house_igloo: HouseIgloo,
  house_nest: HouseNest,
};

export const TOY_COMPONENTS: Record<string, () => JSX.Element> = {
  toy_ball: ToyBall,
  toy_bone: ToyBone,
  toy_mouse: ToyMouse,
  toy_frisbee: ToyFrisbee,
  toy_teddy: ToyTeddy,
};

export const BOWL_COMPONENTS: Record<string, () => JSX.Element> = {
  bowl_basic: BowlBasic,
  bowl_golden: BowlGolden,
  bowl_fountain: BowlFountain,
};

export const BED_COMPONENTS: Record<string, () => JSX.Element> = {
  bed_pillow: BedPillow,
  bed_hammock: BedHammock,
  bed_basket: BedBasket,
};
