const mongoose = require('mongoose');


const UserHabitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
    currentStreak: { type: Number, default: 0 }, // Ongoing streak
    maxStreak: { type: Number, default: 0 }, // Longest streak achieved
    lastTrackedDate: { type: Date }, // Last date user logged for this habit
  });
  
  

  const UserHabitModel = mongoose.model('UserHabit', UserHabitSchema);
  module.exports =  UserHabitModel;