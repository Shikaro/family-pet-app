import { useEffect, useState } from "react";
import { getChallengeProgress } from "../api";
import { ChallengeInfo } from "../types";

interface Props {
  childId: string;
  onClose: () => void;
}

export default function ChallengesPanel({ childId, onClose }: Props) {
  const [challenges, setChallenges] = useState<ChallengeInfo[]>([]);

  useEffect(() => {
    loadChallenges();
  }, [childId]);

  async function loadChallenges() {
    try {
      const data = await getChallengeProgress(childId);
      setChallenges(data);
    } catch (e) {
      console.error("Ошибка загрузки челленджей:", e);
    }
  }

  return (
    <div className="challenges-panel">
      <div className="challenges-header">
        <button className="back-btn" onClick={onClose}>←</button>
        <h2>Челленджи недели</h2>
      </div>

      <div className="challenges-list">
        {challenges.map((ch) => {
          const percent = Math.min(100, Math.round((ch.current / ch.target) * 100));
          return (
            <div key={ch.id} className={`challenge-card ${ch.completed ? "completed" : ""}`}>
              <div className="challenge-top">
                <span className="challenge-emoji">{ch.emoji}</span>
                <div className="challenge-info">
                  <div className="challenge-title">{ch.title}</div>
                  <div className="challenge-desc">{ch.description}</div>
                </div>
                <div className="challenge-reward">
                  +{ch.bonusCoins} 🪙
                </div>
              </div>

              <div className="challenge-progress">
                <div className="challenge-bar">
                  <div className="challenge-bar-fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="challenge-count">{ch.current}/{ch.target}</span>
              </div>

              {ch.completed && (
                <div className="challenge-done">Выполнено!</div>
              )}
            </div>
          );
        })}

        {challenges.length === 0 && (
          <div className="empty-state">Загрузка челленджей...</div>
        )}
      </div>
    </div>
  );
}
