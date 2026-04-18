import { useEffect, useState } from "react";
import { getLeaderboard } from "../api";
import { LeaderboardEntry } from "../types";

interface Props {
  onClose: () => void;
}

const RANK_EMOJIS: Record<number, string> = {
  1: "🌱", 2: "⭐", 3: "🌟", 4: "💫", 5: "🏅", 6: "🦸", 7: "👑",
};

const MEDAL_EMOJIS = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ onClose }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    try {
      const data = await getLeaderboard();
      setEntries(data);
    } catch (e) {
      console.error("Ошибка загрузки рейтинга:", e);
    }
  }

  if (entries.length < 2) {
    return (
      <div className="leaderboard-panel">
        <div className="leaderboard-header">
          <button className="back-btn" onClick={onClose}>←</button>
          <h2>Рейтинг семьи</h2>
        </div>
        <div className="empty-state">
          Добавьте второго ребёнка для рейтинга :)
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-panel">
      <div className="leaderboard-header">
        <button className="back-btn" onClick={onClose}>←</button>
        <h2>Рейтинг семьи</h2>
      </div>

      <div className="leaderboard-list">
        {entries.map((entry, idx) => (
          <div key={entry.id} className={`leaderboard-row ${idx === 0 ? "first" : ""}`}>
            <div className="leaderboard-position">
              {idx < 3 ? MEDAL_EMOJIS[idx] : `${idx + 1}`}
            </div>
            <div
              className="leaderboard-avatar"
              style={{ backgroundColor: entry.avatarColor }}
            >
              {entry.name.charAt(0)}
            </div>
            <div className="leaderboard-info">
              <div className="leaderboard-name">{entry.name}</div>
              <div className="leaderboard-stats">
                {RANK_EMOJIS[entry.rankLevel] || "🌱"} · {entry.totalCompleted} заданий · 🔥 {entry.streakDays} дн.
              </div>
            </div>
            <div className="leaderboard-coins">🪙 {entry.coins}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
