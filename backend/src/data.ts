import { loadStore, saveStore } from "./storage";
import { Challenge, HistoryItem, ParentState, PetStatus, Reward, Task } from "./types";

const defaultParentState: ParentState = {
  coins: 14,
  childName: "Аня",
  childAge: 6,
  streakDays: 4
};

const defaultPetStatus: PetStatus = {
  name: "Топик",
  level: 2,
  happiness: 82,
  energy: 75,
  nextGoal: "Почитать сказку вместе",
  mood: "Любопытный"
};

const defaultHistory: HistoryItem[] = [
  {
    id: "hist-1",
    time: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    message: "Аня выполнила задание 'Убрать игрушки'.",
    type: "task"
  },
  {
    id: "hist-2",
    time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    message: "Питомец Топик получил еду и стал веселее.",
    type: "pet"
  }
];

const defaultTasks: Task[] = [
  {
    id: "task-1",
    title: "Убрать игрушки",
    description: "Сложи все игрушки в коробку и получи монетки.",
    ageRange: "3-6",
    completed: false,
    reward: 3,
    owner: "child",
    emoji: "🧸"
  },
  {
    id: "task-2",
    title: "Нарисовать цветок",
    description: "Нарисуй цветок и покажи родителю.",
    ageRange: "4-8",
    completed: false,
    reward: 4,
    owner: "family",
    emoji: "🌼"
  },
  {
    id: "task-3",
    title: "Прочитать одну страницу книги",
    description: "Выберите одну книгу и прочитай страницу вслух.",
    ageRange: "5-10",
    completed: false,
    reward: 5,
    owner: "family",
    emoji: "📚"
  },
  {
    id: "task-4",
    title: "Покормить питомца",
    description: "Помоги питомцу найти любимую еду и накормить его.",
    ageRange: "2-6",
    completed: false,
    reward: 2,
    owner: "child",
    emoji: "🥕"
  },
  {
    id: "task-5",
    title: "Построить башню из кубиков",
    description: "Собери башню из 5 кубиков вместе с родителем.",
    ageRange: "3-7",
    completed: false,
    reward: 3,
    owner: "family",
    emoji: "🧱"
  }
];

const defaultDailyChallenge: Challenge = {
  id: "challenge-1",
  title: "Найди добрый поступок",
  description: "Помоги ребенку выбрать и сделать добрый поступок сегодня.",
  reward: 7,
  completed: false
};

const defaultRewards: Reward[] = [
  {
    id: "reward-1",
    title: "Дополнительные 10 минут игры",
    description: "Обменяй монетки на игровое время с родителем.",
    cost: 8,
    redeemed: false
  },
  {
    id: "reward-2",
    title: "Маленький сюрприз",
    description: "Получить небольшой подарок по договоренности.",
    cost: 12,
    redeemed: false
  },
  {
    id: "reward-3",
    title: "Выбор вечера",
    description: "Обменяй монетки на право выбрать фильм или игру.",
    cost: 18,
    redeemed: false
  }
];

export interface StoreData {
  parentState: ParentState;
  petStatus: PetStatus;
  history: HistoryItem[];
  tasks: Task[];
  dailyChallenge: Challenge;
  rewards: Reward[];
}

const store = loadStore<StoreData>({
  parentState: defaultParentState,
  petStatus: defaultPetStatus,
  history: defaultHistory,
  tasks: defaultTasks,
  dailyChallenge: defaultDailyChallenge,
  rewards: defaultRewards
});

export const parentState = store.parentState;
export const petStatus = store.petStatus;
export const history = store.history;
export const tasks = store.tasks;
export const dailyChallenge = store.dailyChallenge;
export const rewards = store.rewards;

function saveState() {
  saveStore(store);
}

function addHistory(message: string, type: HistoryItem["type"]) {
  history.unshift({
    id: `hist-${Date.now()}`,
    time: new Date().toISOString(),
    message,
    type
  });
  if (history.length > 10) {
    history.splice(10);
  }
  saveState();
}

function levelUpPet() {
  const nextLevel = Math.min(10, Math.floor(parentState.coins / 15) + 1);
  if (nextLevel > petStatus.level) {
    petStatus.level = nextLevel;
    addHistory(`Питомец вырос до уровня ${petStatus.level}!`, "pet");
  }
}

export function completeTask(taskId: string) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) {
    throw new Error("Задание не найдено");
  }
  if (task.completed) {
    throw new Error("Задание уже выполнено");
  }
  task.completed = true;
  parentState.coins += task.reward;
  parentState.streakDays += 1;
  petStatus.happiness = Math.min(100, petStatus.happiness + 7);
  petStatus.energy = Math.max(0, petStatus.energy - 5);
  petStatus.nextGoal = "Выберите новое задание вместе";
  petStatus.mood = "Радостный";
  addHistory(`Задание '${task.title}' выполнено и +${task.reward} монет.`, "task");
  levelUpPet();
  saveState();
  return task;
}

export function redeemReward(rewardId: string) {
  const reward = rewards.find((item) => item.id === rewardId);
  if (!reward) {
    throw new Error("Приз не найден");
  }
  if (reward.redeemed) {
    throw new Error("Приз уже активирован");
  }
  if (parentState.coins < reward.cost) {
    throw new Error("Недостаточно монет");
  }
  parentState.coins -= reward.cost;
  reward.redeemed = true;
  petStatus.happiness = Math.min(100, petStatus.happiness + 10);
  addHistory(`Награда '${reward.title}' обменяна.`, "reward");
  levelUpPet();
  saveState();
  return reward;
}

export function completeChallenge() {
  if (dailyChallenge.completed) {
    throw new Error("Челлендж уже выполнен");
  }
  dailyChallenge.completed = true;
  parentState.coins += dailyChallenge.reward;
  petStatus.happiness = Math.min(100, petStatus.happiness + 8);
  petStatus.nextGoal = "Сегодня уже было доброе дело";
  petStatus.mood = "Гордый";
  addHistory(`Ежедневный челлендж '${dailyChallenge.title}' выполнен.`, "task");
  levelUpPet();
  saveState();
  return dailyChallenge;
}

export function feedPet() {
  petStatus.energy = Math.min(100, petStatus.energy + 15);
  petStatus.happiness = Math.min(100, petStatus.happiness + 5);
  petStatus.nextGoal = "Питомец доволен и готов к новым заданиям";
  petStatus.mood = "Сытый";
  addHistory("Питомец покормлен и стал энергичнее.", "pet");
  saveState();
  return petStatus;
}

export function playPet() {
  petStatus.happiness = Math.min(100, petStatus.happiness + 12);
  petStatus.energy = Math.max(0, petStatus.energy - 8);
  petStatus.nextGoal = "Пора немного отдохнуть после игр";
  petStatus.mood = "Игривый";
  addHistory("Вы поиграли с питомцем и подняли ему настроение.", "pet");
  saveState();
  return petStatus;
}

