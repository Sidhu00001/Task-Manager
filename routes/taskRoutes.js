const express = require("express");
const router = express.Router();
const { User } = require("../Models/user");
const { Task } = require("../Models/task");
const { auth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");

router.get("/test", auth, (req, res) => {
  res.send({ message: "This is a test route", user: req.user });
});
// create task
router.post("/create", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send({ message: "Task created successfully", task });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
// get all tasks
router.get("/all", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    });
    res.status(200).send({ message: "Tasks fetched successfully", tasks });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
// fetch a task by id
router.get("/:id", auth, async (req, res) => {
  try {
    const TaskId = req.params.id;
    const task = await Task.findOne({
      _id: TaskId,
      owner: req.user._id,
    });
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).send({ message: "Task fetched successfully", task });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
// update a task by id
router.put("/:id", auth, async (req, res) => {
  try {
    const TaskId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates" });
    }
    const task = await Task.findOne({
      _id: TaskId,
      owner: req.user._id,
    });
    if (!task) {
      throw new Error("Task not found");
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
// delete a task by id
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).send({ message: "Task deleted successfully", task });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
module.exports = router;
