import { ParentState } from "../types";

interface Props {
  parent: ParentState;
  mode: "parent" | "child";
}

export default function DashboardPanel({ parent, mode }: Props) {
  return (
    <section className="card">
      <h2>{mode === "parent" ? "Профиль семьи" : "Добро пожаловать, друг"}</h2>
      <div className="stats-row">
        <div>
          <h3>{parent.childName}, {parent.childAge} года</h3>
          <p>{mode === "parent" ? "Следи за прогрессом ребёнка." : "Выбирай задания и помогай питомцу."}</p>
        </div>
        <div>
          <p className="stat-title">Монетки</p>
          <p className="stat-value">{parent.coins}</p>
        </div>
        <div>
          <p className="stat-title">Стрик</p>
          <p className="stat-value">{parent.streakDays} дня</p>
        </div>
      </div>
    </section>
  );
}
