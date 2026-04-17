import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { Family, Session } from "./types";
import { getFamilyById, getSessionByToken, saveSession } from "./storage";

// Простое хеширование — для семейного проекта достаточно
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateToken(): string {
  return crypto.randomUUID();
}

export function createSession(familyId: string): string {
  const token = generateToken();
  const session: Session = {
    token,
    familyId,
    createdAt: new Date().toISOString(),
  };
  saveSession(session);
  return token;
}

// Расширяем Request для TypeScript
export interface AuthRequest extends Request {
  family?: Family;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Требуется авторизация" });
  }

  const token = authHeader.slice(7);
  const session = getSessionByToken(token);
  if (!session) {
    return res.status(401).json({ error: "Недействительный токен" });
  }

  const family = getFamilyById(session.familyId);
  if (!family) {
    return res.status(401).json({ error: "Семья не найдена" });
  }

  req.family = family;
  next();
}
