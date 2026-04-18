import { ChildRank } from "../types";

export const RANKS: ChildRank[] = [
  { level: 1, title: "Новичок", minTasks: 0, emoji: "🌱" },
  { level: 2, title: "Старатель", minTasks: 10, emoji: "⭐" },
  { level: 3, title: "Помощник", minTasks: 30, emoji: "🌟" },
  { level: 4, title: "Умелец", minTasks: 60, emoji: "💫" },
  { level: 5, title: "Мастер", minTasks: 100, emoji: "🏅" },
  { level: 6, title: "Герой", minTasks: 200, emoji: "🦸" },
  { level: 7, title: "Легенда", minTasks: 500, emoji: "👑" },
];

export function getRankForTasks(totalCompleted: number): ChildRank {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (totalCompleted >= r.minTasks) rank = r;
  }
  return rank;
}
