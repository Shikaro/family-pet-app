import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../auth";
import { getChildAchievements, saveChildAchievement, hasAchievement, getPetByChildId } from "../storage";
import { ACHIEVEMENTS } from "../data/achievements";
import { getRankForTasks, RANKS } from "../data/ranks";
import crypto from "crypto";

const router = Router();

// GET /api/achievements/:childId — достижения ребёнка
router.get("/:childId", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const unlocked = getChildAchievements(child.id);
  const unlockedKeys = new Set(unlocked.map((a) => a.achievementKey));

  const all = ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: unlockedKeys.has(a.key),
    unlockedAt: unlocked.find((u) => u.achievementKey === a.key)?.unlockedAt || null,
  }));

  res.json(all);
});

// GET /api/achievements/:childId/rank — ранг ребёнка
router.get("/:childId/rank", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const total = child.totalCompleted || 0;
  const rank = getRankForTasks(total);
  const nextRank = RANKS.find((r) => r.level === rank.level + 1) || null;
  const progress = nextRank ? Math.round(((total - rank.minTasks) / (nextRank.minTasks - rank.minTasks)) * 100) : 100;

  res.json({ rank, nextRank, totalCompleted: total, progress });
});

// POST /api/achievements/:childId/check — проверить и выдать новые достижения
router.post("/:childId/check", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const newAchievements: string[] = [];
  const total = child.totalCompleted || 0;

  function tryUnlock(key: string) {
    if (!hasAchievement(child!.id, key)) {
      saveChildAchievement({
        id: crypto.randomUUID(),
        childId: child!.id,
        achievementKey: key,
        unlockedAt: new Date().toISOString(),
      });
      newAchievements.push(key);
    }
  }

  // Задания
  if (total >= 1) tryUnlock("first_task");
  if (total >= 10) tryUnlock("tasks_10");
  if (total >= 50) tryUnlock("tasks_50");
  if (total >= 100) tryUnlock("tasks_100");
  if (total >= 200) tryUnlock("tasks_200");

  // Серия
  if (child.streakDays >= 3) tryUnlock("streak_3");
  if (child.streakDays >= 7) tryUnlock("streak_7");
  if (child.streakDays >= 14) tryUnlock("streak_14");
  if (child.streakDays >= 30) tryUnlock("streak_30");

  // Монеты
  if (child.coins >= 50) tryUnlock("coins_50");
  if (child.coins >= 100) tryUnlock("coins_100");
  if (child.coins >= 500) tryUnlock("coins_500");

  // Питомец
  if (child.petId) tryUnlock("first_pet");
  const pet = getPetByChildId(child.id);
  if (pet) {
    if (pet.level >= 5) tryUnlock("pet_level_5");
    if (pet.happiness >= 100) tryUnlock("pet_happy_100");
  }

  const newDetails = newAchievements.map((key) => ACHIEVEMENTS.find((a) => a.key === key)!);
  res.json({ newAchievements: newDetails });
});

export default router;
