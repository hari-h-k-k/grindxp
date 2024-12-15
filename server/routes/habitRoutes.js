const express = require("express");
const Habit = require("../models/Habit"); // Adjust the path to your Habit model
const UserHabitModel = require("../models/UserHabit");
const UserGroupModel = require("../models/UserGroup");

const habitRouter = express.Router();

// CREATE a new habit and automatically create a UserHabit entry for the creator
habitRouter.post("/", async (req, res) => {
  try {
    const habit = new Habit(req.body); // Expects fields like name, description, createdBy, etc.
    await habit.save();

    const group = habit.group;

    // If the habit is a group habit, create a UserHabit entry for each user in the group
    if (group) {
      // Find all users in the group (only get the user IDs for efficiency)
      const userGroups = await UserGroupModel.find({ group }).populate("user");
      const userHabitData = userGroups.map((userGroup) => ({
        user: userGroup.user._id,
        habit: habit._id,
        currentStreak: 0,
        maxStreak: 0,
        lastTrackedDate: null,
      }));

      // Use bulkWrite for creating multiple UserHabit entries in a single request
      const bulkOps = userHabitData.map((userHabit) => ({
        insertOne: {
          document: userHabit,
        },
      }));

      // Execute the bulk insert operation
      await UserHabitModel.bulkWrite(bulkOps);
    } else {
      // Create the UserHabit entry for the user who created the habit (if it's a personal habit)
      const userHabit = new UserHabitModel({
        user: createdBy,
        habit: habit._id,
        currentStreak: 0,
        maxStreak: 0,
        lastTrackedDate: null,
      });
      await userHabit.save();
    }

    res.status(201).json({ habit, userHabit }); // Return both habit and userHabit
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
});

// READ all habits
habitRouter.get("/", async (req, res) => {
  try {
    const habits = await Habit.find()
      .populate("createdBy", "name email")
      .populate("group", "name description");
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single habit by ID
habitRouter.get("/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("group", "name description")
      .populate("log.user", "name email");
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a habit by ID
habitRouter.put("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a habit by ID
habitRouter.delete("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = habitRouter;
