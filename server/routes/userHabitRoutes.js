const express = require('express');
const UserHabit = require('../models/UserHabit'); // Adjust the path to your UserHabit model

const userHabitRouter = express.Router();

// CREATE a new UserHabit entry
userHabitRouter.post('/', async (req, res) => {
  try {
    const userHabit = new UserHabit(req.body); // Expects user, habit, and optional fields like currentStreak, maxStreak
    await userHabit.save();
    res.status(201).json(userHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all habits for a specific user
userHabitRouter.get('/user/:userId', async (req, res) => {
  try {
    const userHabits = await UserHabit.find({ user: req.params.userId })
      .populate('habit', 'name description type frequency')
      .populate('user', 'name email');
    res.json(userHabits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all users tracking a specific habit
userHabitRouter.get('/habit/:habitId', async (req, res) => {
  try {
    const habitUsers = await UserHabit.find({ habit: req.params.habitId })
      .populate('user', 'name email')
      .populate('habit', 'name description');
    res.json(habitUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE streak data for a user and habit
userHabitRouter.put('/:id', async (req, res) => {
  try {
    const userHabit = await UserHabit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!userHabit) return res.status(404).json({ error: 'UserHabit entry not found' });
    res.json(userHabit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a specific UserHabit entry
userHabitRouter.delete('/:id', async (req, res) => {
  try {
    const userHabit = await UserHabit.findByIdAndDelete(req.params.id);
    if (!userHabit) return res.status(404).json({ error: 'UserHabit entry not found' });
    res.json({ message: 'UserHabit entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOG progress for a habit (update streaks and lastTrackedDate)
userHabitRouter.post('/log', async (req, res) => {
  try {
    const { userId, habitId, date, status } = req.body;

    const userHabit = await UserHabit.findOne({ user: userId, habit: habitId });
    if (!userHabit) return res.status(404).json({ error: 'UserHabit entry not found' });

    // Check if log date is valid
    if (userHabit.lastTrackedDate && new Date(date) <= new Date(userHabit.lastTrackedDate)) {
      return res.status(400).json({ error: 'Log date must be after last tracked date' });
    }

    // Update streaks and lastTrackedDate
    if (status) {
      const streakGap = Math.floor((new Date(date) - new Date(userHabit.lastTrackedDate || date)) / (1000 * 60 * 60 * 24));
      userHabit.currentStreak = streakGap <= 1 ? userHabit.currentStreak + 1 : 1;
      userHabit.maxStreak = Math.max(userHabit.maxStreak, userHabit.currentStreak);
    } else {
      userHabit.currentStreak = 0; // Reset streak on missed log
    }

    userHabit.lastTrackedDate = new Date(date);

    await userHabit.save();
    res.json(userHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userHabitRouter;
