// === Auth ===

export interface Family {
  id: string;
  parentName: string;
  email: string;
  passwordHash: string;
  children: Child[];
  createdAt: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: "boy" | "girl";
  avatarColor: string;
  petId: string | null;
  coins: number;
  streakDays: number;
  lastActiveDate: string | null;
  totalCompleted: number; // всего выполненных заданий (для рангов)
  rankLevel: number; // текущий уровень ранга
}

export interface Session {
  token: string;
  familyId: string;
  createdAt: string;
}

// === Питомцы ===

export type PetType = "cat" | "dog" | "hamster" | "parrot" | "rabbit" | "turtle" | "dino";

export interface Pet {
  id: string;
  childId: string;
  type: PetType;
  name: string;
  level: number;
  happiness: number; // 0-100
  energy: number;    // 0-100
  mood: "happy" | "neutral" | "sad" | "hungry" | "sleepy";
  accessories: string[]; // ключи экипированных аксессуаров
}

// === Задания ===

export type TaskCategory = "hygiene" | "chores" | "helping" | "learning" | "pet_care";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "anytime";
export type AgeGroup = "2-4" | "5-7" | "8-10";

export interface Task {
  id: string;
  familyId: string;
  childId: string | null; // null = для всех детей семьи
  title: string;
  description: string;
  emoji: string;
  category: TaskCategory;
  timeOfDay: TimeOfDay;
  ageGroup: AgeGroup;
  reward: number;
  isTemplate: boolean;
  isCustom: boolean;
  daysOfWeek: number[] | null; // null = каждый день, [1,2,3,4,5] = будни, [0,6] = выходные
  requirePhoto: boolean;
}

export interface TaskCompletion {
  id: string;
  taskId: string;
  childId: string;
  completedAt: string;
  confirmedByParent: boolean;
  photoUrl: string | null;
  photoStatus: "pending" | "approved" | "rejected" | null;
}

// === Награды ===

export interface Reward {
  id: string;
  familyId: string;
  title: string;
  cost: number;
  description: string;
  emoji: string;
}

// === Уровни/ранги ===

export interface ChildRank {
  level: number;
  title: string;
  minTasks: number; // всего выполненных заданий для достижения
  emoji: string;
}

// === Достижения ===

export interface Achievement {
  id: string;
  key: string; // уникальный ключ достижения
  title: string;
  description: string;
  emoji: string;
  category: "tasks" | "streak" | "coins" | "lessons" | "pets" | "social";
}

export interface ChildAchievement {
  id: string;
  childId: string;
  achievementKey: string;
  unlockedAt: string;
}

// === Аксессуары питомца ===

export type AccessorySlot = "house" | "toy" | "background" | "bowl" | "bed";

export interface PetAccessory {
  id: string;
  key: string;
  title: string;
  emoji: string;
  slot: AccessorySlot;
  cost: number;
}

export interface OwnedAccessory {
  id: string;
  childId: string;
  accessoryKey: string;
  purchasedAt: string;
  equipped: boolean;
}

// === Фото-подтверждение ===

export interface TaskPhoto {
  id: string;
  taskId: string;
  childId: string;
  completionId: string;
  photoUrl: string; // base64 data URL
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt: string | null;
}

// === Недельные челленджи ===

export interface WeeklyChallenge {
  id: string;
  familyId: string;
  title: string;
  description: string;
  emoji: string;
  type: "complete_count" | "streak" | "category" | "time_of_day";
  target: number;
  bonusCoins: number;
  weekStart: string; // ISO date of Monday
  weekEnd: string;
}

export interface ChallengeProgress {
  id: string;
  challengeId: string;
  childId: string;
  current: number;
  completed: boolean;
  completedAt: string | null;
}

// === Расписание по дням недели ===

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Вс, 1=Пн ... 6=Сб

// === Dashboard (API responses) ===

export interface ChildDashboard {
  child: Child;
  pet: Pet | null;
  tasks: Task[];
  completedToday: TaskCompletion[];
  coins: number;
  streakDays: number;
}

export interface ParentDashboard {
  family: {
    id: string;
    parentName: string;
    children: Child[];
  };
  childrenStats: Array<{
    child: Child;
    pet: Pet | null;
    completedToday: number;
    totalTasks: number;
  }>;
}
