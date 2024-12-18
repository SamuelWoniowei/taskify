import mongoose from "mongoose";
import Task from "../models/task.js";

export const addTask = async (req, res) => {
  const { userId, name } = req.body;
  try {
    const task = await new Task({
      userId,
      name,
      status: "pending",
    });
    await task.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/dashboard?error=Something went wrong");
  }
};

export const getUserTasks = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let filter = { userId: id };

    if (status && status !== "all") {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    const message = tasks.length === 0 ? "No tasks found for this filter" : "";

    res.render("dashboard", {
      tasks,
      status,
      message,

    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const updateTask = async (req, res) => {
  const { id, status } = req.body;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).render("dashboard", { message: "Task not found" });
    }

    task.status = status;
    await task.save();
    res.status(200).redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/dashboard?error=Something went wrong");
  }
};
