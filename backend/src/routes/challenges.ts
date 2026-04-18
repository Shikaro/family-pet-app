import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../auth";
import { getWeeklyChallenges, saveWeeklyChallenge, getChallengeProgress, getAllChallengeProgress, saveChallengeProgress, saveFamily } from "../storage";
import { CHALLENGE_TEMPLATES } from "../data/challenge-templates";
import crypto from "crypto";

const router = Router();

function getMonday(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split("T")[0];
}

function getSunday(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? 0 : 7);
  const sunday = new Date(d.setDate(diff));
  return sunday.toISOString().split("T")[0];
}

// Генерировать 3 случайных челленджа на неделю
function ensureWeeklyChallenges(familyId: string): any[] {
  const monday = getMonday();
  const challenges = getWeeklyChallenges(familyId);
  const current = challenges.filter((c) => c.weekStart === monday);

  if (current.length > 0) return current;

  // Выбираем 3 случайных шаблона
  const shuffled = [...CHALLENGE_TEMPLATES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  const newChallenges = selected.map((tpl) => {
    const ch = {
      id: crypto.randomUUID(),
      familyId,
      title: tpl.title,
      description: tpl.description,
      emoji: tpl.emoji,
      type: tpl.type,
      target: tpl.target,
      bonusCoins: tpl.bonusCoins,
      weekStart: monday,
      weekEnd: getSunday(),
    };
    saveWeeklyChallenge(ch);
    return ch;
  });

  return newChallenges;
}

// GET /api/challenges — текущие челленджи семьи
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const challenges = ensureWeeklyChallenges(family.id);
  res.json(challenges);
});

// GET /api/challenges/progress/:childId — прогресс ребёнка по челленджам
router.get("/progress/:childId", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const challenges = ensureWeeklyChallenges(family.id);
  const progress = getAllChallengeProgress(child.id);

  const result = challenges.map((ch: any) => {
    const p = progress.find((pr) => pr.challengeId === ch.id);
    return {
      ...ch,
      current: p?.current || 0,
      completed: p?.completed || false,
      completedAt: p?.completedAt || null,
    };
  });

  res.json(result);
});

// POST /api/challenges/update/:childId — обновить прогресс (вызывается при complete task)
router.post("/update/:childId", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const { type, amount } = req.body; // type = challenge type, amount = increment
  const challenges = ensureWeeklyChallenges(family.id);
  const completed: any[] = [];

  for (const ch of challenges) {
    if (type && ch.type !== type) continue;

    let progress = getChallengeProgress(ch.id, child.id);
    if (!progress) {
      progress = {
        id: crypto.randomUUID(),
        challengeId: ch.id,
        childId: child.id,
        current: 0,
        completed: false,
        completedAt: null,
      };
    }

    if (progress.completed) continue;

    progress.current += amount || 1;
    if (progress.current >= ch.target) {
      progress.completed = true;
      progress.completedAt = new Date().toISOString();
      child.coins += ch.bonusCoins;
      saveFamily(family);
      completed.push({ challenge: ch, bonusCoins: ch.bonusCoins });
    }

    saveChallengeProgress(progress);
  }

  res.json({ completed });
});

// GET /api/challenges/leaderboard — семейный лидерборд
router.get("/leaderboard", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;

  const leaderboard = family.children.map((child) => ({
    id: child.id,
    name: child.name,
    gender: child.gender,
    avatarColor: child.avatarColor,
    coins: child.coins,
    streakDays: child.streakDays,
    totalCompleted: child.totalCompleted || 0,
    rankLevel: child.rankLevel || 1,
  })).sort((a, b) => b.totalCompleted - a.totalCompleted);

  res.json(leaderboard);
});

export default router;
