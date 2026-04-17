import { Router, Request, Response } from "express";
import crypto from "crypto";
import { Family } from "../types";
import { getFamilyByEmail, saveFamily } from "../storage";
import { hashPassword, verifyPassword, createSession, authMiddleware, AuthRequest } from "../auth";

const router = Router();

// POST /api/auth/register
router.post("/register", (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  if (password.length < 4) {
    return res.status(400).json({ error: "Пароль минимум 4 символа" });
  }

  const existing = getFamilyByEmail(email);
  if (existing) {
    return res.status(400).json({ error: "Такой email уже зарегистрирован" });
  }

  const family: Family = {
    id: crypto.randomUUID(),
    parentName: name,
    email: email.toLowerCase(),
    passwordHash: hashPassword(password),
    children: [],
    createdAt: new Date().toISOString(),
  };

  saveFamily(family);
  const token = createSession(family.id);

  res.json({
    token,
    family: {
      id: family.id,
      parentName: family.parentName,
      email: family.email,
      children: family.children,
    },
  });
});

// POST /api/auth/login
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Введите email и пароль" });
  }

  const family = getFamilyByEmail(email);
  if (!family || !verifyPassword(password, family.passwordHash)) {
    return res.status(401).json({ error: "Неверный email или пароль" });
  }

  const token = createSession(family.id);

  res.json({
    token,
    family: {
      id: family.id,
      parentName: family.parentName,
      email: family.email,
      children: family.children,
    },
  });
});

// GET /api/auth/me
router.get("/me", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  res.json({
    family: {
      id: family.id,
      parentName: family.parentName,
      email: family.email,
      children: family.children,
    },
  });
});

export default router;
