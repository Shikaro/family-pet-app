import { useEffect, useState } from "react";
import { getChildAccessories, buyAccessory, equipAccessory } from "../api";
import { AccessoryInfo, AccessorySlot } from "../types";
import { playCoins, playTap } from "../utils/sounds";

interface Props {
  childId: string;
  coins: number;
  onCoinsChange: (coins: number) => void;
  onClose: () => void;
}

const SLOT_LABELS: Record<AccessorySlot, string> = {
  house: "🏠 Домики",
  toy: "🎾 Игрушки",
  bowl: "🍽️ Миски",
  bed: "🛏️ Лежанки",
  background: "🌄 Фоны",
};

const SLOT_ORDER: AccessorySlot[] = ["house", "toy", "bowl", "bed", "background"];

export default function AccessoryShop({ childId, coins, onCoinsChange, onClose }: Props) {
  const [accessories, setAccessories] = useState<AccessoryInfo[]>([]);
  const [activeSlot, setActiveSlot] = useState<AccessorySlot>("house");
  const [buying, setBuying] = useState<string | null>(null);

  useEffect(() => {
    loadAccessories();
  }, [childId]);

  async function loadAccessories() {
    try {
      const data = await getChildAccessories(childId);
      setAccessories(data);
    } catch (e) {
      console.error("Ошибка загрузки:", e);
    }
  }

  async function handleBuy(key: string) {
    setBuying(key);
    try {
      const result = await buyAccessory(childId, key);
      playCoins();
      onCoinsChange(result.coins);
      await loadAccessories();
    } catch (e: any) {
      alert(e.message);
    }
    setBuying(null);
  }

  async function handleEquip(key: string, equip: boolean) {
    playTap();
    try {
      await equipAccessory(childId, key, equip);
      await loadAccessories();
    } catch (e: any) {
      alert(e.message);
    }
  }

  const slotItems = accessories.filter((a) => a.slot === activeSlot);

  return (
    <div className="accessory-shop">
      <div className="accessory-header">
        <button className="back-btn" onClick={onClose}>←</button>
        <h2>Магазин</h2>
        <span className="coins-display">🪙 {coins}</span>
      </div>

      <div className="slot-tabs">
        {SLOT_ORDER.map((slot) => (
          <button
            key={slot}
            className={`slot-tab ${activeSlot === slot ? "active" : ""}`}
            onClick={() => setActiveSlot(slot)}
          >
            {SLOT_LABELS[slot]}
          </button>
        ))}
      </div>

      <div className="accessory-grid">
        {slotItems.map((acc) => (
          <div key={acc.key} className={`accessory-card ${acc.equipped ? "equipped" : ""}`}>
            <div className="accessory-emoji">{acc.emoji}</div>
            <div className="accessory-title">{acc.title}</div>

            {!acc.owned ? (
              <button
                className="buy-btn"
                disabled={coins < acc.cost || buying === acc.key}
                onClick={() => handleBuy(acc.key)}
              >
                {buying === acc.key ? "..." : `🪙 ${acc.cost}`}
              </button>
            ) : (
              <button
                className={`equip-btn ${acc.equipped ? "active" : ""}`}
                onClick={() => handleEquip(acc.key, !acc.equipped)}
              >
                {acc.equipped ? "Убрать" : "Поставить"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
