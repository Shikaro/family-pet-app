import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { getChildDashboard, completeTask, feedPet, playPet } from "../api";
import { ChildDashboard as ChildDashboardData, Task, TaskCompletion } from "../types";
import PetScene from "../components/pets/PetScene";
import PetSelectPage from "./PetSelectPage";
import CoinAnimation from "../components/CoinAnimation";
import LessonGame from "../components/LessonGame";
import { playComplete, playPetHappy } from "../utils/sounds";

const TIME_LABELS: Record<string, string> = {
  morning: "🌅 Утро",
  afternoon: "☀️ День",
  evening: "🌙 Вечер",
};

const CATEGORY_LABELS: Record<string, string> = {
  hygiene: "Гигиена",
  chores: "Порядок",
  helping: "Помощь",
  learning: "Учёба",
  pet_care: "Питомец",
};

function getCurrentTimeOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

export default function ChildDashboard() {
  const { activeChild, setParentMode } = useProfile();
  const [data, setData] = useState<ChildDashboardData | null>(null);
  const [activeTime, setActiveTime] = useState(getCurrentTimeOfDay());
  const [needsPet, setNeedsPet] = useState(false);
  const [showCoins, setShowCoins] = useState<number | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [showLesson, setShowLesson] = useState(false);
  const [activeTab, setActiveTab] = useState<"tasks" | "learn">("tasks");

  const load = async () => {
    if (!activeChild) return;
    try {
      const d = await getChildDashboard(activeChild.id);
      setData(d);
      if (!d.pet) setNeedsPet(true);
    } catch {}
  };

  useEffect(() => { load(); }, [activeChild?.id]);

  if (!activeChild) return null;
  if (needsPet) return <PetSelectPage onDone={() => { setNeedsPet(false); load(); }} />;
  if (!data) return <div className="loading-screen">🐾</div>;

  if (showLesson && data.pet) {
    return (
      <LessonGame
        pet={data.pet}
        childAge={activeChild.age}
        onEarnCoins={(amount) => {
          setShowCoins(amount);
          load();
        }}
        onClose={() => setShowLesson(false)}
      />
    );
  }

  const completedIds = new Set(data.completedToday.map((c: TaskCompletion) => c.taskId));
  const filteredTasks = data.tasks.filter((t: Task) =>
    t.timeOfDay === activeTime || t.timeOfDay === "anytime"
  );
  const doneCount = filteredTasks.filter((t) => completedIds.has(t.id)).length;
  const totalCount = filteredTasks.length;

  const handleComplete = async (task: Task) => {
    if (completingId) return;
    setCompletingId(task.id);

    try {
      await completeTask(task.id, activeChild.id);
      playComplete();
      setShowCoins(task.reward);
      if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
      await load();
    } catch {}
    setCompletingId(null);
  };

  const handleFeed = async () => {
    try { playPetHappy(); await feedPet(activeChild.id); await load(); } catch {}
  };

  const handlePlay = async () => {
    try { playPetHappy(); await playPet(activeChild.id); await load(); } catch {}
  };

  return (
    <div className="child-dashboard">
      {/* Анимация монеток */}
      {showCoins && (
        <CoinAnimation count={showCoins} onDone={() => setShowCoins(null)} />
      )}

      {/* Шапка */}
      <div className="child-header">
        <button className="back-btn" onClick={setParentMode}>←</button>
        <div className="child-info">
          <span className="child-name">{activeChild.name}</span>
          <span className="child-stats">🪙 {data.coins} · 🔥 {data.streakDays} дн.</span>
        </div>
      </div>

      {/* Питомец */}
      {data.pet && (
        <div className="pet-area">
          <PetScene pet={data.pet} onTap={handlePlay} onSwipeUp={handleFeed} />
          <div className="pet-status-bar">
            <span>{data.pet.name} · Ур. {data.pet.level}</span>
            <span>😊 {data.pet.happiness}% · ⚡ {data.pet.energy}%</span>
          </div>
        </div>
      )}

      {/* Табы: Задания / Учиться */}
      <div className="main-tabs">
        <button
          className={`main-tab ${activeTab === "tasks" ? "active" : ""}`}
          onClick={() => setActiveTab("tasks")}
        >
          📋 Задания
        </button>
        <button
          className={`main-tab ${activeTab === "learn" ? "active" : ""}`}
          onClick={() => { setActiveTab("learn"); setShowLesson(true); }}
        >
          📚 Учиться
        </button>
      </div>

      {activeTab === "tasks" && (
        <>
          {/* Прогресс дня */}
          <div className="day-progress">
            <div className="day-progress-bar">
              <div
                className="day-progress-fill"
                style={{ width: totalCount > 0 ? `${(doneCount / totalCount) * 100}%` : "0%" }}
              />
            </div>
            <span className="day-progress-text">
              {doneCount === totalCount && totalCount > 0
                ? "Всё сделано! 🎉"
                : `${doneCount} из ${totalCount}`}
            </span>
          </div>

          {/* Время дня */}
          <div className="time-tabs">
            {["morning", "afternoon", "evening"].map((time) => (
              <button
                key={time}
                className={`time-tab ${activeTime === time ? "active" : ""}`}
                onClick={() => setActiveTime(time)}
              >
                {TIME_LABELS[time]}
              </button>
            ))}
          </div>

          {/* Задания — визуальные карточки */}
          <div className="task-cards">
            {filteredTasks.length === 0 ? (
              <div className="empty-tasks">Нет заданий на это время</div>
            ) : (
              filteredTasks.map((task: Task) => {
                const done = completedIds.has(task.id);
                const isCompleting = completingId === task.id;
                return (
                  <div
                    key={task.id}
                    className={`task-card-v2 ${done ? "done" : ""} ${isCompleting ? "completing" : ""}`}
                    onClick={() => !done && !isCompleting && handleComplete(task)}
                  >
                    <div className="task-card-illustration">
                      <span>{task.emoji}</span>
                    </div>
                    <div className="task-card-body">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                    <div className="task-card-reward">
                      {done ? (
                        <span className="task-done-check">✅</span>
                      ) : (
                        <span className="task-coin-badge">+{task.reward} 🪙</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
