import { Router, Response } from "express";
import crypto from "crypto";
import { Child } from "../types";
import { saveFamily } from "../storage";
import { authMiddleware, AuthRequest } from "../auth";

const router = Router();

// GET /api/children
router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json(req.family!.children);
});

// POST /api/children
router.post("/", authMiddleware, (req: AuthRequest, res: Response) => {
  const { name, age, gender } = req.body;

  if (!name || !age || !gender) {
    return res.status(400).json({ error: "Заполните имя, возраст и пол" });
  }

  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];
  const family = req.family!;

  const child: Child = {
    id: crypto.randomUUID(),
    name,
    age: parseInt(age),
    gender,
    avatarColor: colors[family.children.length % colors.length],
    petId: null,
    coins: 0,
    streakDays: 0,
    lastActiveDate: null,
  };

  family.children.push(child);
  saveFamily(family);

  res.json(child);
});

// PUT /api/children/:id
router.put("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.id);

  if (!child) {
    return res.status(404).json({ error: "Ребёнок не найден" });
  }

  const { name, age, gender } = req.body;
  if (name) child.name = name;
  if (age) child.age = parseInt(age);
  if (gender) child.gender = gender;

  saveFamily(family);
  res.json(child);
});

// DELETE /api/children/:id
router.delete("/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const idx = family.children.findIndex((c) => c.id === req.params.id);

  if (idx < 0) {
    return res.status(404).json({ error: "Ребёнок не найден" });
  }

  family.children.splice(idx, 1);
  saveFamily(family);
  res.json({ success: true });
});

export default router;
