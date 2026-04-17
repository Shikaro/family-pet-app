import { Reward } from "../types";

interface Props {
  rewards: Reward[];
  onRedeem: (rewardId: string) => void;
  mode: "parent" | "child";
}

export default function RewardShop({ rewards, onRedeem, mode }: Props) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>Магазин наград</h2>
        <span>Обменивай монетки на реальные призы.</span>
      </div>
      <div className="reward-list">
        {rewards.map((reward) => (
          <article key={reward.id} className={`reward-item ${reward.redeemed ? "redeemed" : ""}`}>
            <div>
              <h3>{reward.title}</h3>
              <p>{reward.description}</p>
            </div>
            <button onClick={() => onRedeem(reward.id)} disabled={reward.redeemed || mode === "child"}>
              {reward.redeemed ? "Забронирован" : mode === "child" ? "Только родитель" : `Купить за ${reward.cost}`}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
