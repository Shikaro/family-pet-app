import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { getParentDashboard } from "../api";
import { Child, Pet } from "../types";

interface ChildStat {
  child: Child;
  pet: Pet | null;
  completedToday: number;
  totalTasks: number;
}

export default function ParentDashboard() {
  const { family } = useAuth();
  const { setChildMode, setParentMode } = useProfile();
  const [stats, setStats] = useState<ChildStat[]>([]);

  useEffect(() => {
    getParentDashboard()
      .then((d) => setStats(d.childrenStats))
      .catch(() => {});
  }, []);

  if (!family) return null;

  return (
    <div className="parent-dashboard">
      <div className="parent-header">
        <button className="back-btn" onClick={setParentMode}>←</button>
        <h1>Семья {family.parentName}</h1>
      </div>

      {stats.length === 0 ? (
        <div className="empty-parent">
          <p>Добавьте детей на экране выбора профиля</p>
        </div>
      ) : (
        <div className="children-stats">
          {stats.map((s) => (
            <div
              key={s.child.id}
              className="child-stat-card"
              onClick={() => setChildMode(s.child)}
            >
              <div className="child-stat-avatar" style={{ background: s.child.avatarColor }}>
                {s.child.gender === "boy" ? "👦" : "👧"}
              </div>
              <div className="child-stat-info">
                <h3>{s.child.name}</h3>
                <p>{s.child.age} лет</p>
              </div>
              <div className="child-stat-numbers">
                <div>
                  <span className="stat-label">Сегодня</span>
                  <span className="stat-val">{s.completedToday}/{s.totalTasks}</span>
                </div>
                <div>
                  <span className="stat-label">Монеты</span>
                  <span className="stat-val">🪙 {s.child.coins}</span>
                </div>
                <div>
                  <span className="stat-label">Стрик</span>
                  <span className="stat-val">🔥 {s.child.streakDays}</span>
                </div>
              </div>
              {s.pet && (
                <div className="child-stat-pet">
                  {s.pet.type === "cat" ? "🐱" : s.pet.type === "dog" ? "🐶" : s.pet.type === "hamster" ? "🐹" : s.pet.type === "parrot" ? "🦜" : s.pet.type === "rabbit" ? "🐰" : "🐢"}{" "}
                  {s.pet.name} · Ур. {s.pet.level}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
