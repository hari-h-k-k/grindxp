const express = require('express');
const habitCompletionRouter = express.Router();
const HabitCompletion = require('../models/HabitCompletion');
const UserHabit = require('../models/UserHabit');

// Route to track habit completion for a specific user on a specific date
habitCompletionRouter.post('/add', async (req, res) => {
  try {
    const { userId, habitId, date, status } = req.body;
    const completionDate = new Date(date);

    // Check if the habit completion entry already exists for that date
    const existingCompletion = await HabitCompletion.findOne({ user: userId, habit: habitId, date: completionDate });
    if (existingCompletion) {
      return res.status(400).json({ error: 'Completion status for this date already exists' });
    }

    // Create the new HabitCompletion entry
    const habitCompletion = new HabitCompletion({
      user: userId,
      habit: habitId,
      date: completionDate,
      status,
    });

    await habitCompletion.save();

    // Update the UserHabit model for streak tracking
    const userHabit = await UserHabit.findOne({ user: userId, habit: habitId });
    if (!userHabit) return res.status(404).json({ error: 'UserHabit entry not found' });

    // Calculate the streak and update the currentStreak, maxStreak, and lastTrackedDate
    const lastTrackedDate = userHabit.lastTrackedDate ? new Date(userHabit.lastTrackedDate) : null;
    const streakGap = lastTrackedDate ? Math.floor((completionDate - lastTrackedDate) / (1000 * 60 * 60 * 24)) : 1;

    if (status) {
      // If the habit is completed, update streaks
      userHabit.currentStreak = streakGap <= 1 ? userHabit.currentStreak + 1 : 1; // Increment if consecutive, else reset to 1
      userHabit.maxStreak = Math.max(userHabit.maxStreak, userHabit.currentStreak); // Update max streak
    } else {
      userHabit.currentStreak = 0; // Reset streak if missed
    }

    userHabit.lastTrackedDate = completionDate; // Update last tracked date

    await userHabit.save();

    res.json({ habitCompletion, userHabit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get habit completion status for the last 'n' days
habitCompletionRouter.get('/user/:userId/habit/:habitId/last/:days', async (req, res) => {
  try {
    const { userId, habitId, days } = req.params;

    // Get today's date and calculate the start date 'n' days ago
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - parseInt(days));

    // Query HabitCompletion to get completions for the last 'n' days
    const completions = await HabitCompletion.find({
      user: userId,
      habit: habitId,
      date: { $gte: startDate, $lte: today },
    }).sort({ date: 1 }); // Sort by date ascending

    // Format response with completion status for each day
    const result = completions.map((completion) => ({
      date: completion.date.toISOString().split('T')[0], // Only return date, no time
      status: completion.status ? 'Completed' : 'Missed',
    }));

    res.json({ habitId, userId, completions: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = habitCompletionRouter;
