import { PetStatus } from "../types";

interface Props {
  pet: PetStatus;
  onFeed: () => void;
  onPlay: () => void;
}

export default function PetCard({ pet, onFeed, onPlay }: Props) {
  return (
    <section className="card pet-card">
      <div className="pet-header">
        <div>
          <p className="pet-title">Питомец {pet.name}</p>
          <p className="pet-subtitle">Уровень {pet.level}</p>
        </div>
        <div className="pet-bubble">{pet.nextGoal}</div>
      </div>
      <div className="pet-stats">
        <div>
          <span>Настроение</span>
          <strong>{pet.happiness}%</strong>
        </div>
        <div>
          <span>Энергия</span>
          <strong>{pet.energy}%</strong>
        </div>
      </div>
      <div className="pet-actions">
        <button onClick={onFeed}>Накормить</button>
        <button onClick={onPlay}>Поиграть</button>
      </div>
    </section>
  );
}
