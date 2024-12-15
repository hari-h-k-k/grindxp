const mongoose = require('mongoose');


const HabitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['personal', 'group'], required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // Required for group habits
    frequency: { type: String, required: true }, // e.g., 'daily', 'weekly'
    startDate: { type: Date, required: true },
    log: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // For individual or group member
        date: { type: Date, required: true },
        status: { type: Boolean, required: true }, // true if completed, false if missed
      },
    ],
  });
  
  

  const HabitModel = mongoose.model('Habit', HabitSchema);
  module.exports =  HabitModel;