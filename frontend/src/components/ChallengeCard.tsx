import { Challenge } from "../types";

interface Props {
  challenge: Challenge;
  onComplete: () => void;
}

export default function ChallengeCard({ challenge, onComplete }: Props) {
  return (
    <section className="card challenge-card">
      <div className="card-header">
        <h2>Ежедневный челлендж</h2>
        <span>Задача для роста и добрых привычек.</span>
      </div>
      <div className="challenge-body">
        <h3>{challenge.title}</h3>
        <p>{challenge.description}</p>
        <div className="challenge-meta">
          <span>+{challenge.reward} монет</span>
          <button onClick={onComplete} disabled={challenge.completed}>
            {challenge.completed ? "Выполнено" : "Выполнить"}
          </button>
        </div>
      </div>
    </section>
  );
}
