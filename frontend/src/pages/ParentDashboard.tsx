import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { getParentDashboard } from "../api";
import { Child, Pet, Task, TaskCompletion } from "../types";

interface ChildStat {
  child: Child;
  pet: Pet | null;
  completedToday: number;
  totalTasks: number;
  tasks: Task[];
  completions: TaskCompletion[];
}

const PET_EMOJIS: Record<string, string> = {
  cat: "🐱", dog: "🐶", hamster: "🐹", parrot: "🦜", rabbit: "🐰", turtle: "🐢",
};

const TIME_LABELS: Record<string, string> = {
  morning: "Утро", afternoon: "День", evening: "Вечер", anytime: "Любое",
};

export default function ParentDashboard() {
  const { family, logout } = useAuth();
  const { setChildMode } = useProfile();
  const [stats, setStats] = useState<ChildStat[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const d = await getParentDashboard();
      setStats(d.childrenStats);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (!family) return null;
  if (loading) return <div className="loading-screen">⏳</div>;

  const selected = selectedChild ? stats.find((s) => s.child.id === selectedChild) : null;

  // Детальный вид ребёнка
  if (selected) {
    const completedIds = new Set(selected.completions.map((c) => c.taskId));
    const byTime: Record<string, Task[]> = {};
    selected.tasks.forEach((t) => {
      const key = t.timeOfDay || "anytime";
      if (!byTime[key]) byTime[key] = [];
      byTime[key].push(t);
    });

    return (
      <div className="parent-dashboard">
        <div className="parent-header">
          <button className="back-btn" onClick={() => setSelectedChild(null)}>←</button>
          <h1>{selected.child.name}</h1>
          <button className="play-btn" onClick={() => setChildMode(selected.child)}>
            Играть ▶
          </button>
        </div>

        {/* Сводка */}
        <div className="parent-summary-cards">
          <div className="summary-card">
            <span className="summary-num">{selected.child.coins}</span>
            <span className="summary-label">🪙 Монеты</span>
          </div>
          <div className="summary-card">
            <span className="summary-num">{selected.child.streakDays}</span>
            <span className="summary-label">🔥 Дни подряд</span>
          </div>
          <div className="summary-card">
            <span className="summary-num">{selected.completedToday}/{selected.totalTasks}</span>
            <span className="summary-label">Сегодня</span>
          </div>
          {selected.pet && (
            <div className="summary-card">
              <span className="summary-num">{PET_EMOJIS[selected.pet.type] || "🐾"}</span>
              <span className="summary-label">{selected.pet.name} Ур.{selected.pet.level}</span>
            </div>
          )}
        </div>

        {/* Прогресс бар */}
        <div className="parent-progress">
          <div className="parent-progress-bar">
            <div
              className="parent-progress-fill"
              style={{ width: selected.totalTasks > 0 ? `${(selected.completedToday / selected.totalTasks) * 100}%` : "0%" }}
            />
          </div>
        </div>

        {/* Задания по времени дня */}
        {["morning", "afternoon", "evening", "anytime"].map((time) => {
          const tasks = byTime[time];
          if (!tasks || tasks.length === 0) return null;
          return (
            <div key={time} className="parent-time-section">
              <h3 className="parent-time-title">{TIME_LABELS[time]}</h3>
              <div className="parent-task-list">
                {tasks.map((task) => {
                  const done = completedIds.has(task.id);
                  return (
                    <div key={task.id} className={`parent-task-item ${done ? "done" : ""}`}>
                      <span className="parent-task-emoji">{task.emoji}</span>
                      <div className="parent-task-info">
                        <span className="parent-task-title">{task.title}</span>
                        <span className="parent-task-desc">{task.description}</span>
                      </div>
                      <span className="parent-task-status">
                        {done ? "✅" : `+${task.reward} 🪙`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Главный экран — список детей
  const totalCoins = stats.reduce((s, c) => s + c.child.coins, 0);
  const totalDone = stats.reduce((s, c) => s + c.completedToday, 0);
  const totalAll = stats.reduce((s, c) => s + c.totalTasks, 0);

  return (
    <div className="parent-dashboard">
      <div className="parent-header">
        <h1>Семья</h1>
        <button className="logout-btn" onClick={logout}>Выйти</button>
      </div>

      {/* Общая сводка семьи */}
      <div className="family-summary">
        <div className="family-summary-item">
          <span className="family-summary-num">{totalDone}/{totalAll}</span>
          <span className="family-summary-label">заданий сегодня</span>
        </div>
        <div className="family-summary-item">
          <span className="family-summary-num">{totalCoins}</span>
          <span className="family-summary-label">🪙 всего монет</span>
        </div>
      </div>

      {stats.length === 0 ? (
        <div className="empty-parent">
          <p>Добавьте детей на экране выбора профиля</p>
        </div>
      ) : (
        <div className="children-stats">
          {stats.map((s) => {
            const pct = s.totalTasks > 0 ? Math.round((s.completedToday / s.totalTasks) * 100) : 0;
            return (
              <div
                key={s.child.id}
                className="child-stat-card-v2"
                onClick={() => setSelectedChild(s.child.id)}
              >
                <div className="csc-top">
                  <div className="csc-avatar" style={{ background: s.child.avatarColor }}>
                    {s.child.gender === "boy" ? "👦" : "👧"}
                  </div>
                  <div className="csc-info">
                    <h3>{s.child.name}</h3>
                    <span className="csc-age">{s.child.age} {s.child.age < 5 ? "года" : "лет"}</span>
                  </div>
                  {s.pet && (
                    <div className="csc-pet">
                      {PET_EMOJIS[s.pet.type] || "🐾"} {s.pet.name}
                    </div>
                  )}
                </div>

                <div className="csc-progress">
                  <div className="csc-progress-bar">
                    <div className="csc-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="csc-progress-text">
                    {s.completedToday}/{s.totalTasks} ({pct}%)
                  </span>
                </div>

                <div className="csc-bottom">
                  <span>🪙 {s.child.coins}</span>
                  <span>🔥 {s.child.streakDays} дн.</span>
                  <span className="csc-arrow">→</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
