import { Router, Response } from "express";
import crypto from "crypto";
import { Task, TaskCompletion, AgeGroup } from "../types";
import { getTasksByFamily, saveTask, saveTasks, getCompletionsByChild, saveCompletion, saveFamily, getPetByChildId, savePet } from "../storage";
import { authMiddleware, AuthRequest } from "../auth";
import { taskTemplates } from "../data/task-templates";

const router = Router();

function ageToGroup(age: number): AgeGroup {
  if (age <= 4) return "2-4";
  if (age <= 7) return "5-7";
  return "8-10";
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

// POST /api/tasks/init — инициализировать задания из шаблонов для семьи
router.post("/init", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const existing = getTasksByFamily(family.id);

  if (existing.length > 0) {
    return res.json({ message: "Задания уже инициализированы", count: existing.length });
  }

  const tasks: Task[] = taskTemplates.map((tpl) => ({
    id: crypto.randomUUID(),
    familyId: family.id,
    childId: null,
    title: tpl.title,
    description: tpl.description,
    emoji: tpl.emoji,
    category: tpl.category,
    timeOfDay: tpl.timeOfDay,
    ageGroup: tpl.ageGroup,
    reward: tpl.reward,
    isTemplate: true,
    isCustom: false,
  }));

  saveTasks(tasks);
  res.json({ message: "Задания инициализированы", count: tasks.length });
});

// GET /api/tasks?childId=X&timeOfDay=morning
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  let tasks = getTasksByFamily(family.id);

  const { childId, timeOfDay, category } = req.query;

  // Фильтр по ребёнку (по возрасту)
  if (childId && typeof childId === "string") {
    const child = family.children.find((c) => c.id === childId);
    if (child) {
      const group = ageToGroup(child.age);
      tasks = tasks.filter((t) => t.ageGroup === group && (t.childId === null || t.childId === childId));
    }
  }

  if (timeOfDay && typeof timeOfDay === "string") {
    tasks = tasks.filter((t) => t.timeOfDay === timeOfDay || t.timeOfDay === "anytime");
  }

  if (category && typeof category === "string") {
    tasks = tasks.filter((t) => t.category === category);
  }

  res.json(tasks);
});

// GET /api/tasks/templates — все шаблоны
router.get("/templates", (_req, res: Response) => {
  res.json(taskTemplates);
});

// POST /api/tasks — создать кастомное задание
router.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const { title, description, emoji, category, timeOfDay, ageGroup, reward, childId } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Укажите название задания" });
  }

  const task: Task = {
    id: crypto.randomUUID(),
    familyId: family.id,
    childId: childId || null,
    title,
    description: description || "",
    emoji: emoji || "⭐",
    category: category || "chores",
    timeOfDay: timeOfDay || "anytime",
    ageGroup: ageGroup || "5-7",
    reward: reward || 3,
    isTemplate: false,
    isCustom: true,
  };

  saveTask(task);
  res.json(task);
});

// POST /api/tasks/:id/complete — ребёнок выполнил задание
router.post("/:id/complete", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const { childId } = req.body;
  const taskId = req.params.id;

  const tasks = getTasksByFamily(family.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Задание не найдено" });
  }

  const child = family.children.find((c) => c.id === childId);
  if (!child) {
    return res.status(404).json({ error: "Ребёнок не найден" });
  }

  // Проверяем, не выполнено ли уже сегодня
  const todayCompletions = getCompletionsByChild(childId, todayStr());
  const alreadyDone = todayCompletions.find((c) => c.taskId === taskId);
  if (alreadyDone) {
    return res.status(400).json({ error: "Это задание уже выполнено сегодня" });
  }

  const completion: TaskCompletion = {
    id: crypto.randomUUID(),
    taskId,
    childId,
    completedAt: new Date().toISOString(),
    confirmedByParent: false,
  };

  saveCompletion(completion);

  // Начисляем монеты и обновляем стрик
  child.coins += task.reward;
  const today = todayStr();
  if (child.lastActiveDate !== today) {
    child.streakDays += 1;
    child.lastActiveDate = today;
  }
  saveFamily(family);

  // Повышаем настроение питомца
  const pet = getPetByChildId(childId);
  if (pet) {
    pet.happiness = Math.min(100, pet.happiness + 5);
    pet.mood = "happy";
    // Левел-ап каждые 15 монет
    const newLevel = Math.min(10, Math.floor(child.coins / 15) + 1);
    if (newLevel > pet.level) {
      pet.level = newLevel;
    }
    savePet(pet);
  }

  res.json({ completion, coins: child.coins, streakDays: child.streakDays, pet });
});

// GET /api/tasks/completions?childId=X&date=YYYY-MM-DD
router.get("/completions", authMiddleware, (req: AuthRequest, res: Response) => {
  const { childId, date } = req.query;
  if (!childId || typeof childId !== "string") {
    return res.status(400).json({ error: "Укажите childId" });
  }
  const completions = getCompletionsByChild(childId, (date as string) || todayStr());
  res.json(completions);
});

export default router;
