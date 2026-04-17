import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { getChildDashboard, completeTask, feedPet, playPet } from "../api";
import { ChildDashboard as ChildDashboardData, Task, TaskCompletion, Pet } from "../types";
import PetScene from "../components/pets/PetScene";
import PetSelectPage from "./PetSelectPage";

const TIME_LABELS: Record<string, string> = {
  morning: "🌅 Утро",
  afternoon: "☀️ День",
  evening: "🌙 Вечер",
  anytime: "⭐ Любое время",
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
  const [status, setStatus] = useState("");
  const [needsPet, setNeedsPet] = useState(false);

  const load = async () => {
    if (!activeChild) return;
    try {
      const d = await getChildDashboard(activeChild.id);
      setData(d);
      if (!d.pet) setNeedsPet(true);
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  useEffect(() => { load(); }, [activeChild?.id]);

  if (!activeChild) return null;
  if (needsPet) return <PetSelectPage onDone={() => { setNeedsPet(false); load(); }} />;
  if (!data) return <div className="loading-screen">Загрузка...</div>;

  const completedIds = new Set(data.completedToday.map((c: TaskCompletion) => c.taskId));

  const filteredTasks = data.tasks.filter((t: Task) =>
    t.timeOfDay === activeTime || t.timeOfDay === "anytime"
  );

  const handleComplete = async (taskId: string) => {
    try {
      setStatus("Выполняю...");
      await completeTask(taskId, activeChild.id);
      await load();
      setStatus("Молодец! 🎉");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      setStatus((err as Error).message);
    }
  };

  const handleFeed = async () => {
    try {
      await feedPet(activeChild.id);
      await load();
    } catch {}
  };

  const handlePlay = async () => {
    try {
      await playPet(activeChild.id);
      await load();
    } catch {}
  };

  return (
    <div className="child-dashboard">
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
          <PetScene
            pet={data.pet}
            onTap={handlePlay}
            onSwipeUp={handleFeed}
          />
          <div className="pet-status-bar">
            <span>{data.pet.name} · Ур. {data.pet.level}</span>
            <span>😊 {data.pet.happiness}% · ⚡ {data.pet.energy}%</span>
          </div>
        </div>
      )}

      {status && <div className="child-status">{status}</div>}

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

      {/* Задания */}
      <div className="task-cards">
        {filteredTasks.length === 0 ? (
          <div className="empty-tasks">Все задания выполнены! 🎉</div>
        ) : (
          filteredTasks.map((task: Task) => {
            const done = completedIds.has(task.id);
            return (
              <div key={task.id} className={`task-card ${done ? "done" : ""}`}>
                <div className="task-card-left">
                  <span className="task-emoji">{task.emoji}</span>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className="task-category">{CATEGORY_LABELS[task.category]}</span>
                  </div>
                </div>
                <div className="task-card-right">
                  <span className="task-reward">+{task.reward} 🪙</span>
                  {!done && (
                    <button className="task-done-btn" onClick={() => handleComplete(task.id)}>
                      ✓
                    </button>
                  )}
                  {done && <span className="task-check">✅</span>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
