import express from "express";
import {
  addTask,
  getUserTasks,
  updateTask,
} from "../controllers/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserTasks);
router.put("/", verifyToken, updateTask);
router.post("/", verifyToken, addTask);

export default router;
