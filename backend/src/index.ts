import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(routes);

// В production отдаём статику фронтенда
const frontendDist = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDist));
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend started on port ${PORT}`);
});
