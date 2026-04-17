import { useEffect, useState } from "react";
import { Dashboard } from "./types";
import { completeChallenge, completeTask, fetchDashboard, feedPet, playPet, redeemReward } from "./api";
import DashboardPanel from "./components/DashboardPanel";
import TaskList from "./components/TaskList";
import RewardShop from "./components/RewardShop";
import PetCard from "./components/PetCard";
import ModeSwitcher from "./components/ModeSwitcher";
import HistoryPanel from "./components/HistoryPanel";
import ChallengeCard from "./components/ChallengeCard";

function App() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [status, setStatus] = useState<string>("Загрузка данных...");
  const [mode, setMode] = useState<"parent" | "child">("parent");

  async function loadDashboard() {
    try {
      const data = await fetchDashboard();
      setDashboard(data);
      setStatus("");
    } catch (error) {
      setStatus((error as Error).message);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    try {
      setStatus("Отмечаем задание...");
      await completeTask(taskId);
      await loadDashboard();
      setStatus("Задание выполнено! Монетки начислены.");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  const handleRedeemReward = async (rewardId: string) => {
    try {
      setStatus("Обмениваем монетки...");
      await redeemReward(rewardId);
      await loadDashboard();
      setStatus("Приз забронирован! Обсуди подарок с ребенком.");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  const handleFeedPet = async () => {
    try {
      setStatus("Накармливаем питомца...");
      await feedPet();
      await loadDashboard();
      setStatus("Питомец счастлив и отдохнул.");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  const handlePlayPet = async () => {
    try {
      setStatus("Играем с питомцем...");
      await playPet();
      await loadDashboard();
      setStatus("Питомец доволен и хочет новых заданий.");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  const handleCompleteChallenge = async () => {
    try {
      setStatus("Выполняем челлендж...");
      await completeChallenge();
      await loadDashboard();
      setStatus("Челлендж завершён, добавлены монетки и настроение питомца.");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-brand">Family Pet</p>
          <h1>Приложение для семьи и развития ребенка</h1>
        </div>
        <div className="status-bar">{status || "Готово"}</div>
      </header>

      {dashboard ? (
        <div className="app-grid">
          <main className="panel panel-main">
            <div className="top-controls">
              <DashboardPanel parent={dashboard.parent} mode={mode} />
              <ModeSwitcher mode={mode} onChange={setMode} />
            </div>
            <TaskList tasks={dashboard.tasks} onComplete={handleCompleteTask} mode={mode} />
            <RewardShop rewards={dashboard.rewards} onRedeem={handleRedeemReward} mode={mode} />
            <ChallengeCard challenge={dashboard.challenge} onComplete={handleCompleteChallenge} />
            <HistoryPanel history={dashboard.history} />
          </main>
          <aside className="panel panel-side">
            <PetCard pet={dashboard.pet} onFeed={handleFeedPet} onPlay={handlePlayPet} />
          </aside>
        </div>
      ) : (
        <div className="empty-state">Загрузка проекта...</div>
      )}
    </div>
  );
}

export default App;
