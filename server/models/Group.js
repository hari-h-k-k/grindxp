const mongoose = require('mongoose');


const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  
  
    const GroupModel = mongoose.model('Group', GroupSchema);
    module.exports =  GroupModel;