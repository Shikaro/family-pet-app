import { Router, Response } from "express";
import { getRewardsByFamily, saveReward, saveFamily, deleteRewardById } from "../storage";
import { authMiddleware, AuthRequest } from "../auth";
import { Reward } from "../types";
import crypto from "crypto";
import { rewardTemplates } from "../data/reward-templates";

const router = Router();

// Инициализация стандартных наград при первом запросе
function ensureDefaultRewards(familyId: string): Reward[] {
  let rewards = getRewardsByFamily(familyId);
  if (rewards.length === 0) {
    rewards = rewardTemplates.map((tpl) => {
      const reward: Reward = {
        id: crypto.randomUUID(),
        familyId,
        title: tpl.title,
        description: tpl.description,
        emoji: tpl.emoji,
        cost: tpl.cost,
      };
      saveReward(reward);
      return reward;
    });
  }
  return rewards;
}

// GET /api/rewards — список наград семьи
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const rewards = ensureDefaultRewards(family.id);
  res.json(rewards);
});

// POST /api/rewards — создать награду (родитель)
router.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const { title, description, emoji, cost } = req.body;

  if (!title || !cost) {
    return res.status(400).json({ error: "Укажите название и стоимость" });
  }

  const reward: Reward = {
    id: crypto.randomUUID(),
    familyId: family.id,
    title,
    description: description || "",
    emoji: emoji || "🎁",
    cost: Number(cost),
  };

  saveReward(reward);
  res.json(reward);
});

// DELETE /api/rewards/:id — удалить награду
router.delete("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const rewards = getRewardsByFamily(family.id);
  const reward = rewards.find((r) => r.id === req.params.id);

  if (!reward) {
    return res.status(404).json({ error: "Награда не найдена" });
  }

  deleteRewardById(req.params.id);
  res.json({ ok: true });
});

// POST /api/rewards/:id/redeem — ребёнок покупает награду
router.post("/:id/redeem", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const { childId } = req.body;

  const child = family.children.find((c) => c.id === childId);
  if (!child) {
    return res.status(404).json({ error: "Ребёнок не найден" });
  }

  const rewards = getRewardsByFamily(family.id);
  const reward = rewards.find((r) => r.id === req.params.id);
  if (!reward) {
    return res.status(404).json({ error: "Награда не найдена" });
  }

  if (child.coins < reward.cost) {
    return res.status(400).json({ error: "Не хватает монет" });
  }

  child.coins -= reward.cost;
  saveFamily(family);

  res.json({ ok: true, coins: child.coins });
});

export default router;
