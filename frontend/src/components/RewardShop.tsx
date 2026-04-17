import { useEffect, useState } from "react";
import { Reward } from "../types";
import { getRewards, redeemReward } from "../api";
import { playCoins } from "../utils/sounds";

interface Props {
  childId: string;
  coins: number;
  onSpend: () => void;
  onClose: () => void;
}

export default function RewardShop({ childId, coins, onSpend, onClose }: Props) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRewards()
      .then(setRewards)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRedeem = async (reward: Reward) => {
    if (coins < reward.cost) {
      setMessage("Не хватает монеток :(");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    setRedeemingId(reward.id);
    try {
      await redeemReward(reward.id, childId);
      playCoins();
      if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
      setMessage(`Ура! "${reward.title}" твоя!`);
      onSpend();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage((err as Error).message);
    }
    setRedeemingId(null);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <button className="back-btn" onClick={onClose}>←</button>
        <h2>Магазин наград</h2>
        <span className="shop-coins">🪙 {coins}</span>
      </div>

      {loading ? (
        <div className="loading-screen">🎁</div>
      ) : rewards.length === 0 ? (
        <div className="shop-empty">
          <span className="shop-empty-icon">🎁</span>
          <p>Пока наград нет</p>
          <p className="shop-empty-hint">Попроси родителей добавить призы!</p>
        </div>
      ) : (
        <div className="shop-grid">
          {rewards.map((r) => {
            const canAfford = coins >= r.cost;
            return (
              <div
                key={r.id}
                className={`shop-item ${canAfford ? "" : "too-expensive"}`}
                onClick={() => canAfford && handleRedeem(r)}
              >
                <span className="shop-item-emoji">{r.emoji}</span>
                <span className="shop-item-title">{r.title}</span>
                {r.description && <span className="shop-item-desc">{r.description}</span>}
                <span className={`shop-item-price ${canAfford ? "" : "red"}`}>
                  🪙 {r.cost}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {message && <div className="shop-message">{message}</div>}
    </div>
  );
}
