import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = 4000;

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(routes);

app.get("/", (_req, res) => {
  res.send("Family Pet App backend is running.");
});

app.listen(PORT, () => {
  console.log(`Backend started on http://localhost:${PORT}`);
});
