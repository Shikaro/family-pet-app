import { Router, Response } from "express";
import crypto from "crypto";
import { Pet, PetType } from "../types";
import { getPetByChildId, savePet, saveFamily } from "../storage";
import { authMiddleware, AuthRequest } from "../auth";

const VALID_TYPES: PetType[] = ["cat", "dog", "hamster", "parrot", "rabbit", "turtle", "dino"];

const router = Router();

// POST /api/pets/choose — выбрать питомца для ребёнка
router.post("/choose", authMiddleware, (req: AuthRequest, res: Response) => {
  const { childId, type, name } = req.body;
  const family = req.family!;

  const child = family.children.find((c) => c.id === childId);
  if (!child) {
    return res.status(404).json({ error: "Ребёнок не найден" });
  }

  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ error: "Неизвестный тип питомца" });
  }

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: "Придумайте имя питомцу" });
  }

  const pet: Pet = {
    id: crypto.randomUUID(),
    childId,
    type,
    name: name.trim(),
    level: 1,
    happiness: 70,
    energy: 80,
    mood: "happy",
  };

  savePet(pet);
  child.petId = pet.id;
  saveFamily(family);

  res.json(pet);
});

// GET /api/pets/:childId — статус питомца
router.get("/:childId", authMiddleware, (req: AuthRequest, res: Response) => {
  const pet = getPetByChildId(req.params.childId);
  if (!pet) {
    return res.status(404).json({ error: "Питомец не найден" });
  }
  res.json(pet);
});

// POST /api/pets/:childId/feed
router.post("/:childId/feed", authMiddleware, (req: AuthRequest, res: Response) => {
  const pet = getPetByChildId(req.params.childId);
  if (!pet) {
    return res.status(404).json({ error: "Питомец не найден" });
  }

  pet.energy = Math.min(100, pet.energy + 15);
  pet.happiness = Math.min(100, pet.happiness + 5);
  pet.mood = "happy";
  savePet(pet);

  res.json(pet);
});

// POST /api/pets/:childId/play
router.post("/:childId/play", authMiddleware, (req: AuthRequest, res: Response) => {
  const pet = getPetByChildId(req.params.childId);
  if (!pet) {
    return res.status(404).json({ error: "Питомец не найден" });
  }

  pet.happiness = Math.min(100, pet.happiness + 12);
  pet.energy = Math.max(0, pet.energy - 8);
  pet.mood = "happy";
  savePet(pet);

  res.json(pet);
});

export default router;
