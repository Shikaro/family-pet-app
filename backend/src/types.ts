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
}

export interface Session {
  token: string;
  familyId: string;
  createdAt: string;
}

// === Питомцы ===

export type PetType = "cat" | "dog" | "hamster" | "parrot" | "rabbit" | "turtle";

export interface Pet {
  id: string;
  childId: string;
  type: PetType;
  name: string;
  level: number;
  happiness: number; // 0-100
  energy: number;    // 0-100
  mood: "happy" | "neutral" | "sad" | "hungry" | "sleepy";
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
}

export interface TaskCompletion {
  id: string;
  taskId: string;
  childId: string;
  completedAt: string;
  confirmedByParent: boolean;
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
