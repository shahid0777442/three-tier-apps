import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tasks from "./routes/tasks.js";

const { PORT = 5000, MONGO_URI, FRONTEND_ORIGIN = "http://localhost:5173" } = process.env;

const app = express();
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/tasks", tasks);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

try {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
} catch (err) {
  console.error("Could not connect to MongoDB:", err.message);
  process.exit(1);
}
