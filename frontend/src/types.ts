export type PetType = "cat" | "dog" | "hamster" | "parrot" | "rabbit" | "turtle" | "dino";
export type TaskCategory = "hygiene" | "chores" | "helping" | "learning" | "pet_care";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "anytime";
export type AgeGroup = "2-4" | "5-7" | "8-10";

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
  totalCompleted: number;
  rankLevel: number;
}

export interface Pet {
  id: string;
  childId: string;
  type: PetType;
  name: string;
  level: number;
  happiness: number;
  energy: number;
  mood: string;
}

export interface Task {
  id: string;
  familyId: string;
  childId: string | null;
  title: string;
  description: string;
  emoji: string;
  category: TaskCategory;
  timeOfDay: TimeOfDay;
  ageGroup: AgeGroup;
  reward: number;
  isTemplate: boolean;
  isCustom: boolean;
  daysOfWeek: number[] | null;
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

export interface FamilyInfo {
  id: string;
  parentName: string;
  email: string;
  children: Child[];
}

export interface ChildDashboard {
  child: Child;
  pet: Pet | null;
  tasks: Task[];
  completedToday: TaskCompletion[];
  coins: number;
  streakDays: number;
}

export interface Reward {
  id: string;
  familyId: string;
  title: string;
  description: string;
  emoji: string;
  cost: number;
}

// === Ранги ===
export interface ChildRank {
  level: number;
  title: string;
  minTasks: number;
  emoji: string;
}

export interface RankInfo {
  rank: ChildRank;
  nextRank: ChildRank | null;
  totalCompleted: number;
  progress: number;
}

// === Достижения ===
export interface AchievementInfo {
  id: string;
  key: string;
  title: string;
  description: string;
  emoji: string;
  category: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

// === Аксессуары ===
export type AccessorySlot = "hat" | "glasses" | "background" | "collar" | "wings";

export interface AccessoryInfo {
  id: string;
  key: string;
  title: string;
  emoji: string;
  slot: AccessorySlot;
  cost: number;
  owned: boolean;
  equipped: boolean;
}

// === Челленджи ===
export interface ChallengeInfo {
  id: string;
  title: string;
  description: string;
  emoji: string;
  type: string;
  target: number;
  bonusCoins: number;
  weekStart: string;
  weekEnd: string;
  current: number;
  completed: boolean;
  completedAt: string | null;
}

// === Лидерборд ===
export interface LeaderboardEntry {
  id: string;
  name: string;
  gender: string;
  avatarColor: string;
  coins: number;
  streakDays: number;
  totalCompleted: number;
  rankLevel: number;
}

export interface ParentDashboard {
  family: FamilyInfo;
  childrenStats: Array<{
    child: Child;
    pet: Pet | null;
    completedToday: number;
    totalTasks: number;
  }>;
}
