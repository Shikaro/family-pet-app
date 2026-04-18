import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../auth";
import { getOwnedAccessories, saveOwnedAccessory, updateOwnedAccessory, saveFamily, getPetByChildId, savePet } from "../storage";
import { PET_ACCESSORIES } from "../data/accessories";
import crypto from "crypto";

const router = Router();

// GET /api/accessories/catalog — каталог всех аксессуаров
router.get("/catalog", authMiddleware, (_req: AuthRequest, res: Response) => {
  res.json(PET_ACCESSORIES);
});

// GET /api/accessories/:childId — аксессуары ребёнка (купленные)
router.get("/:childId", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const owned = getOwnedAccessories(child.id);
  const ownedKeys = new Set(owned.map((a) => a.accessoryKey));

  const catalog = PET_ACCESSORIES.map((acc) => ({
    ...acc,
    owned: ownedKeys.has(acc.key),
    equipped: owned.find((o) => o.accessoryKey === acc.key)?.equipped || false,
  }));

  res.json(catalog);
});

// POST /api/accessories/:childId/buy — купить аксессуар
router.post("/:childId/buy", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const { accessoryKey } = req.body;
  const accessory = PET_ACCESSORIES.find((a) => a.key === accessoryKey);
  if (!accessory) return res.status(404).json({ error: "Аксессуар не найден" });

  const owned = getOwnedAccessories(child.id);
  if (owned.some((o) => o.accessoryKey === accessoryKey)) {
    return res.status(400).json({ error: "Уже куплено" });
  }

  if (child.coins < accessory.cost) {
    return res.status(400).json({ error: "Не хватает монет" });
  }

  child.coins -= accessory.cost;
  saveFamily(family);

  saveOwnedAccessory({
    id: crypto.randomUUID(),
    childId: child.id,
    accessoryKey,
    purchasedAt: new Date().toISOString(),
    equipped: false,
  });

  res.json({ ok: true, coins: child.coins });
});

// POST /api/accessories/:childId/equip — надеть/снять аксессуар
router.post("/:childId/equip", authMiddleware, (req: AuthRequest, res: Response) => {
  const family = req.family!;
  const child = family.children.find((c) => c.id === req.params.childId);
  if (!child) return res.status(404).json({ error: "Ребёнок не найден" });

  const { accessoryKey, equip } = req.body;
  const owned = getOwnedAccessories(child.id);
  const item = owned.find((o) => o.accessoryKey === accessoryKey);
  if (!item) return res.status(404).json({ error: "Аксессуар не куплен" });

  const accessory = PET_ACCESSORIES.find((a) => a.key === accessoryKey);
  if (!accessory) return res.status(404).json({ error: "Аксессуар не найден" });

  // Снять другой аксессуар того же слота
  if (equip) {
    for (const o of owned) {
      const acc = PET_ACCESSORIES.find((a) => a.key === o.accessoryKey);
      if (acc && acc.slot === accessory.slot && o.equipped && o.id !== item.id) {
        o.equipped = false;
        updateOwnedAccessory(o);
      }
    }
  }

  item.equipped = !!equip;
  updateOwnedAccessory(item);

  // Обновить массив accessories у питомца
  const pet = getPetByChildId(child.id);
  if (pet) {
    const equipped = getOwnedAccessories(child.id).filter((o) => o.equipped);
    pet.accessories = equipped.map((o) => o.accessoryKey);
    savePet(pet);
  }

  res.json({ ok: true });
});

export default router;
