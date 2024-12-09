import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import Task from "../models/task.js";
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const userId = res.locals.user._id;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    return res.render("dashboard", {
      tasks,
      status:'all',
      message: tasks.length === 0 ? "No tasks found. Add new tasks" : "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Something went wrong" });
  }
});

export default router;
