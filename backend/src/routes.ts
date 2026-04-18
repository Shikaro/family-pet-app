import { Router } from "express";
import authRoutes from "./routes/auth";
import childrenRoutes from "./routes/children";
import petsRoutes from "./routes/pets";
import tasksRoutes from "./routes/tasks";
import dashboardRoutes from "./routes/dashboard";
import rewardsRoutes from "./routes/rewards";
import achievementsRoutes from "./routes/achievements";
import accessoriesRoutes from "./routes/accessories";
import challengesRoutes from "./routes/challenges";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/children", childrenRoutes);
router.use("/api/pets", petsRoutes);
router.use("/api/tasks", tasksRoutes);
router.use("/api/dashboard", dashboardRoutes);
router.use("/api/rewards", rewardsRoutes);
router.use("/api/achievements", achievementsRoutes);
router.use("/api/accessories", accessoriesRoutes);
router.use("/api/challenges", challengesRoutes);

export default router;
