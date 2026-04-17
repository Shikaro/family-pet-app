import { Router } from "express";
import {
  completeTask,
  completeChallenge,
  dailyChallenge,
  feedPet,
  history,
  playPet,
  parentState,
  petStatus,
  redeemReward,
  rewards,
  tasks
} from "./data";

const router = Router();

router.get("/api/dashboard", (_req, res) => {
  res.json({
    parent: parentState,
    tasks,
    rewards,
    pet: petStatus,
    history,
    challenge: dailyChallenge
  });
});

router.get("/api/tasks", (req, res) => {
  const owner = req.query.owner;
  if (owner && typeof owner === "string") {
    const filtered = tasks.filter((task) => task.owner === owner || task.owner === "family");
    return res.json(filtered);
  }
  res.json(tasks);
});

router.post("/api/tasks/:id/complete", (req, res) => {
  try {
    const task = completeTask(req.params.id);
    res.json({ success: true, task, coins: parentState.coins, pet: petStatus });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
});

router.get("/api/rewards", (_req, res) => {
  res.json(rewards);
});

router.get("/api/history", (_req, res) => {
  res.json(history);
});

router.post("/api/rewards/:id/redeem", (req, res) => {
  try {
    const reward = redeemReward(req.params.id);
    res.json({ success: true, reward, coins: parentState.coins });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
});

router.get("/api/pet", (_req, res) => {
  res.json(petStatus);
});

router.get("/api/challenge", (_req, res) => {
  res.json(dailyChallenge);
});

router.post("/api/challenge/complete", (_req, res) => {
  try {
    const challenge = completeChallenge();
    res.json({ success: true, challenge, coins: parentState.coins });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
});

router.post("/api/pet/feed", (_req, res) => {
  const pet = feedPet();
  res.json({ success: true, pet });
});

router.post("/api/pet/play", (_req, res) => {
  const pet = playPet();
  res.json({ success: true, pet });
});

export default router;
