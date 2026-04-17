import { Router, Response } from "express";
import { getTasksByFamily, getCompletionsByChild, getPetByChildId } from "../storage";
import { authMiddleware, AuthRequest } from "../auth";

const router = Router();

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function ageToGroup(age: number): string {
  if (age <= 4) return "2-4";
  if (age <= 7) return "5-7";
  return "8-10";
}

// GET /api/dashboard/child/:childId
router.get("/child/:childId", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);

  if (!child) {
    return res.status(404).json({ error: "Ребёнок не найден" });
  }

  const allTasks = getTasksByFamily(family.id);
  const group = ageToGroup(child.age);
  const tasks = allTasks.filter(
    (t) => t.ageGroup === group && (t.childId === null || t.childId === child.id)
  );

  const completedToday = getCompletionsByChild(child.id, todayStr());
  const pet = getPetByChildId(child.id);

  res.json({
    child,
    pet,
    tasks,
    completedToday,
    coins: child.coins,
    streakDays: child.streakDays,
  });
});

// GET /api/dashboard/parent
router.get("/parent", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const allTasks = getTasksByFamily(family.id);

  const childrenStats = family.children.map((child) => {
    const group = ageToGroup(child.age);
    const tasks = allTasks.filter(
      (t) => t.ageGroup === group && (t.childId === null || t.childId === child.id)
    );
    const completedToday = getCompletionsByChild(child.id, todayStr());
    const pet = getPetByChildId(child.id);

    return {
      child,
      pet,
      completedToday: completedToday.length,
      totalTasks: tasks.length,
    };
  });

  res.json({
    family: {
      id: family.id,
      parentName: family.parentName,
      children: family.children,
    },
    childrenStats,
  });
});

export default router;
