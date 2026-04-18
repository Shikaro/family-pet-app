import { useEffect, useState } from "react";
import { getAchievements, getRank, checkAchievements } from "../api";
import { AchievementInfo, RankInfo } from "../types";

interface Props {
  childId: string;
  onClose: () => void;
}

export default function AchievementsPanel({ childId, onClose }: Props) {
  const [achievements, setAchievements] = useState<AchievementInfo[]>([]);
  const [rankInfo, setRankInfo] = useState<RankInfo | null>(null);
  const [newUnlocked, setNewUnlocked] = useState<AchievementInfo[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadData();
  }, [childId]);

  async function loadData() {
    try {
      const [ach, rank] = await Promise.all([
        getAchievements(childId),
        getRank(childId),
      ]);
      setAchievements(ach);
      setRankInfo(rank);

      // Проверяем новые достижения
      const result = await checkAchievements(childId);
      if (result.newAchievements?.length > 0) {
        setNewUnlocked(result.newAchievements);
        // Перезагружаем список
        const updated = await getAchievements(childId);
        setAchievements(updated);
      }
    } catch (e) {
      console.error("Ошибка загрузки достижений:", e);
    }
  }

  const categories = [
    { key: "all", label: "Все" },
    { key: "tasks", label: "Задания" },
    { key: "streak", label: "Серия" },
    { key: "coins", label: "Монеты" },
    { key: "lessons", label: "Уроки" },
    { key: "pets", label: "Питомцы" },
    { key: "social", label: "Особые" },
  ];

  const filtered = filter === "all" ? achievements : achievements.filter((a) => a.category === filter);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="achievements-panel">
      <div className="achievements-header">
        <button className="back-btn" onClick={onClose}>←</button>
        <h2>Достижения</h2>
        <span className="achievements-count">{unlockedCount}/{achievements.length}</span>
      </div>

      {/* Ранг */}
      {rankInfo && (
        <div className="rank-card">
          <div className="rank-emoji">{rankInfo.rank.emoji}</div>
          <div className="rank-info">
            <div className="rank-title">{rankInfo.rank.title}</div>
            <div className="rank-progress-bar">
              <div className="rank-progress-fill" style={{ width: `${rankInfo.progress}%` }} />
            </div>
            {rankInfo.nextRank && (
              <div className="rank-next">
                До «{rankInfo.nextRank.title}» {rankInfo.nextRank.emoji}: ещё {rankInfo.nextRank.minTasks - rankInfo.totalCompleted} заданий
              </div>
            )}
          </div>
        </div>
      )}

      {/* Новые достижения */}
      {newUnlocked.length > 0 && (
        <div className="new-achievements-popup">
          {newUnlocked.map((a) => (
            <div key={a.key} className="new-achievement-item">
              <span className="new-achievement-emoji">{a.emoji}</span>
              <div>
                <div className="new-achievement-title">{a.title}</div>
                <div className="new-achievement-desc">{a.description}</div>
              </div>
            </div>
          ))}
          <button onClick={() => setNewUnlocked([])}>Супер!</button>
        </div>
      )}

      {/* Фильтры */}
      <div className="achievements-filters">
        {categories.map((c) => (
          <button
            key={c.key}
            className={`filter-btn ${filter === c.key ? "active" : ""}`}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Список */}
      <div className="achievements-grid">
        {filtered.map((a) => (
          <div key={a.key} className={`achievement-card ${a.unlocked ? "unlocked" : "locked"}`}>
            <div className="achievement-emoji">{a.emoji}</div>
            <div className="achievement-title">{a.title}</div>
            <div className="achievement-desc">{a.description}</div>
            {a.unlocked && a.unlockedAt && (
              <div className="achievement-date">{new Date(a.unlockedAt).toLocaleDateString("ru")}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
