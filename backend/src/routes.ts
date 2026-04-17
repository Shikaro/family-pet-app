import { Router } from "express";
import authRoutes from "./routes/auth";
import childrenRoutes from "./routes/children";
import petsRoutes from "./routes/pets";
import tasksRoutes from "./routes/tasks";
import dashboardRoutes from "./routes/dashboard";
import rewardsRoutes from "./routes/rewards";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/children", childrenRoutes);
router.use("/api/pets", petsRoutes);
router.use("/api/tasks", tasksRoutes);
router.use("/api/dashboard", dashboardRoutes);
router.use("/api/rewards", rewardsRoutes);

export default router;
