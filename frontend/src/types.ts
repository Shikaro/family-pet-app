export interface Task {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  completed: boolean;
  reward: number;
  owner: "parent" | "child" | "family";
  emoji: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  redeemed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

export interface PetStatus {
  name: string;
  level: number;
  happiness: number;
  energy: number;
  nextGoal: string;
  mood: string;
}

export interface ParentState {
  coins: number;
  childName: string;
  childAge: number;
  streakDays: number;
}

export interface HistoryItem {
  id: string;
  time: string;
  message: string;
  type: "task" | "reward" | "pet";
}

export interface Dashboard {
  parent: ParentState;
  tasks: Task[];
  rewards: Reward[];
  pet: PetStatus;
  history: HistoryItem[];
  challenge: Challenge;
}
