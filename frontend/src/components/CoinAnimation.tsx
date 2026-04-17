import { useEffect, useState } from "react";

interface Props {
  count: number;
  onDone: () => void;
}

export default function CoinAnimation({ count, onDone }: Props) {
  const [coins, setCoins] = useState<number[]>([]);

  useEffect(() => {
    // Создаём монеты с задержкой
    const ids: number[] = [];
    for (let i = 0; i < count; i++) {
      ids.push(i);
    }
    setCoins(ids);

    // Вибрация
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }

    const timer = setTimeout(onDone, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="coin-animation-overlay">
      <div className="coin-celebration">
        <span className="coin-big-text">+{count} 🪙</span>
        {coins.map((i) => (
          <span
            key={i}
            className="coin-falling"
            style={{
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            🪙
          </span>
        ))}
        <span className="coin-star-burst">⭐</span>
      </div>
    </div>
  );
}
