import fs from "fs";
import path from "path";
import { Family, Pet, Task, TaskCompletion, Session, Reward, ChildAchievement, OwnedAccessory, WeeklyChallenge, ChallengeProgress } from "./types";

const DATA_DIR = path.resolve(__dirname, "../data");

// Создаём директорию для данных
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePath(name: string): string {
  return path.join(DATA_DIR, `${name}.json`);
}

function readJSON<T>(name: string, fallback: T[]): T[] {
  const fp = filePath(name);
  try {
    if (!fs.existsSync(fp)) return fallback;
    return JSON.parse(fs.readFileSync(fp, "utf-8"));
  } catch {
    return fallback;
  }
}

function writeJSON<T>(name: string, data: T[]) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf-8");
}

// === Families ===

export function getFamilies(): Family[] {
  return readJSON<Family>("families", []);
}

export function getFamilyById(id: string): Family | undefined {
  return getFamilies().find((f) => f.id === id);
}

export function getFamilyByEmail(email: string): Family | undefined {
  return getFamilies().find((f) => f.email.toLowerCase() === email.toLowerCase());
}

export function saveFamily(family: Family) {
  const families = getFamilies();
  const idx = families.findIndex((f) => f.id === family.id);
  if (idx >= 0) {
    families[idx] = family;
  } else {
    families.push(family);
  }
  writeJSON("families", families);
}

// === Sessions ===

export function getSessions(): Session[] {
  return readJSON<Session>("sessions", []);
}

export function saveSession(session: Session) {
  const sessions = getSessions();
  sessions.push(session);
  writeJSON("sessions", sessions);
}

export function getSessionByToken(token: string): Session | undefined {
  return getSessions().find((s) => s.token === token);
}

export function deleteSession(token: string) {
  const sessions = getSessions().filter((s) => s.token !== token);
  writeJSON("sessions", sessions);
}

// === Pets ===

export function getPets(): Pet[] {
  return readJSON<Pet>("pets", []);
}

export function getPetByChildId(childId: string): Pet | undefined {
  return getPets().find((p) => p.childId === childId);
}

export function savePet(pet: Pet) {
  const pets = getPets();
  const idx = pets.findIndex((p) => p.id === pet.id);
  if (idx >= 0) {
    pets[idx] = pet;
  } else {
    pets.push(pet);
  }
  writeJSON("pets", pets);
}

// === Tasks ===

export function getTasks(): Task[] {
  return readJSON<Task>("tasks", []);
}

export function getTasksByFamily(familyId: string): Task[] {
  return getTasks().filter((t) => t.familyId === familyId);
}

export function saveTask(task: Task) {
  const tasks = getTasks();
  const idx = tasks.findIndex((t) => t.id === task.id);
  if (idx >= 0) {
    tasks[idx] = task;
  } else {
    tasks.push(task);
  }
  writeJSON("tasks", tasks);
}

export function saveTasks(newTasks: Task[]) {
  const tasks = getTasks();
  for (const task of newTasks) {
    const idx = tasks.findIndex((t) => t.id === task.id);
    if (idx >= 0) {
      tasks[idx] = task;
    } else {
      tasks.push(task);
    }
  }
  writeJSON("tasks", tasks);
}

// === Completions ===

export function getCompletions(): TaskCompletion[] {
  return readJSON<TaskCompletion>("completions", []);
}

export function getCompletionsByChild(childId: string, date?: string): TaskCompletion[] {
  const all = getCompletions().filter((c) => c.childId === childId);
  if (!date) return all;
  return all.filter((c) => c.completedAt.startsWith(date));
}

export function saveCompletion(completion: TaskCompletion) {
  const completions = getCompletions();
  completions.push(completion);
  writeJSON("completions", completions);
}

// === Rewards ===

export function getRewards(): Reward[] {
  return readJSON<Reward>("rewards", []);
}

export function getRewardsByFamily(familyId: string): Reward[] {
  return getRewards().filter((r) => r.familyId === familyId);
}

export function saveReward(reward: Reward) {
  const rewards = getRewards();
  const idx = rewards.findIndex((r) => r.id === reward.id);
  if (idx >= 0) {
    rewards[idx] = reward;
  } else {
    rewards.push(reward);
  }
  writeJSON("rewards", rewards);
}

export function deleteRewardById(id: string) {
  const rewards = getRewards().filter((r) => r.id !== id);
  writeJSON("rewards", rewards);
}

// === Achievements ===

export function getChildAchievements(childId: string): ChildAchievement[] {
  return readJSON<ChildAchievement>("achievements", []).filter((a) => a.childId === childId);
}

export function saveChildAchievement(achievement: ChildAchievement) {
  const all = readJSON<ChildAchievement>("achievements", []);
  all.push(achievement);
  writeJSON("achievements", all);
}

export function hasAchievement(childId: string, key: string): boolean {
  return getChildAchievements(childId).some((a) => a.achievementKey === key);
}

// === Owned Accessories ===

export function getOwnedAccessories(childId: string): OwnedAccessory[] {
  return readJSON<OwnedAccessory>("accessories", []).filter((a) => a.childId === childId);
}

export function saveOwnedAccessory(acc: OwnedAccessory) {
  const all = readJSON<OwnedAccessory>("accessories", []);
  all.push(acc);
  writeJSON("accessories", all);
}

export function updateOwnedAccessory(acc: OwnedAccessory) {
  const all = readJSON<OwnedAccessory>("accessories", []);
  const idx = all.findIndex((a) => a.id === acc.id);
  if (idx >= 0) all[idx] = acc;
  writeJSON("accessories", all);
}

export function getEquippedAccessories(childId: string): OwnedAccessory[] {
  return getOwnedAccessories(childId).filter((a) => a.equipped);
}

// === Weekly Challenges ===

export function getWeeklyChallenges(familyId: string): WeeklyChallenge[] {
  return readJSON<WeeklyChallenge>("challenges", []).filter((c) => c.familyId === familyId);
}

export function saveWeeklyChallenge(challenge: WeeklyChallenge) {
  const all = readJSON<WeeklyChallenge>("challenges", []);
  all.push(challenge);
  writeJSON("challenges", all);
}

export function getChallengeProgress(challengeId: string, childId: string): ChallengeProgress | undefined {
  return readJSON<ChallengeProgress>("challenge_progress", [])
    .find((p) => p.challengeId === challengeId && p.childId === childId);
}

export function getAllChallengeProgress(childId: string): ChallengeProgress[] {
  return readJSON<ChallengeProgress>("challenge_progress", []).filter((p) => p.childId === childId);
}

export function saveChallengeProgress(progress: ChallengeProgress) {
  const all = readJSON<ChallengeProgress>("challenge_progress", []);
  const idx = all.findIndex((p) => p.id === progress.id);
  if (idx >= 0) {
    all[idx] = progress;
  } else {
    all.push(progress);
  }
  writeJSON("challenge_progress", all);
}
