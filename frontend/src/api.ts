import { Dashboard } from "./types";

const baseUrl = import.meta.env.VITE_API_URL || "/api";

export async function fetchDashboard(): Promise<Dashboard> {
  const response = await fetch(`${baseUrl}/dashboard`);
  if (!response.ok) {
    throw new Error("Не удалось загрузить данные");
  }
  return response.json();
}

export async function completeTask(taskId: string) {
  const response = await fetch(`${baseUrl}/tasks/${taskId}/complete`, { method: "POST" });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Ошибка выполнения задания");
  }
  return response.json();
}

export async function redeemReward(rewardId: string) {
  const response = await fetch(`${baseUrl}/rewards/${rewardId}/redeem`, { method: "POST" });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Ошибка при обмене монеток");
  }
  return response.json();
}

export async function completeChallenge() {
  const response = await fetch(`${baseUrl}/challenge/complete`, { method: "POST" });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Ошибка выполнения челленджа");
  }
  return response.json();
}

export async function feedPet() {
  const response = await fetch(`${baseUrl}/pet/feed`, { method: "POST" });
  if (!response.ok) {
    throw new Error("Не удалось накормить питомца");
  }
  return response.json();
}

export async function playPet() {
  const response = await fetch(`${baseUrl}/pet/play`, { method: "POST" });
  if (!response.ok) {
    throw new Error("Не удалось поиграть с питомцем");
  }
  return response.json();
}
