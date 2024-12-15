const mongoose = require('mongoose');

const HabitCompletionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
    date: { type: Date, required: true, unique: true }, // The specific day
    status: { type: Boolean, required: true }, // true if completed, false if missed
  });
  
  const HabitCompletionModel = mongoose.model('HabitCompletion', HabitCompletionSchema);
  module.exports =  HabitCompletionModel;