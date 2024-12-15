const mongoose = require('mongoose');


const UserGroupSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' }, // User role in the group
    joinedAt: { type: Date, default: Date.now }, // When the user joined the group
  });
  
  
  
    const UserGroupModel = mongoose.model('UserGroup', UserGroupSchema);
    module.exports =  UserGroupModel;