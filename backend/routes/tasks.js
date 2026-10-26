import { Router } from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";

const router = Router();

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id)
    ? next()
    : res.status(400).json({ error: "Invalid task id" });

router.get("/", async (_req, res) => {
  res.json(await Task.find().sort({ createdAt: -1 }));
});

router.post("/", async (req, res) => {
  const title = req.body?.title?.trim();
  if (!title) return res.status(400).json({ error: "Title is required" });
  res.status(201).json(await Task.create({ title }));
});

router.patch("/:id", validId, async (req, res) => {
  const updates = {};
  if (typeof req.body.done === "boolean") updates.done = req.body.done;
  if (typeof req.body.title === "string" && req.body.title.trim())
    updates.title = req.body.title.trim();
  const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
  task ? res.json(task) : res.status(404).json({ error: "Task not found" });
});

router.delete("/:id", validId, async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  task ? res.status(204).end() : res.status(404).json({ error: "Task not found" });
});

export default router;
