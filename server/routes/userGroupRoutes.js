const express = require('express');
const UserGroup = require('../models/UserGroup'); // Adjust the path to your UserGroup model

const userGroupRouter = express.Router();

// ADD a user to a group
userGroupRouter.post('/', async (req, res) => {
  try {
    const userGroup = new UserGroup(req.body); // Expects user, group, and optionally role
    await userGroup.save();
    res.status(201).json(userGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all users in a specific group
userGroupRouter.get('/group/:groupId', async (req, res) => {
  try {
    const usersInGroup = await UserGroup.find({ group: req.params.groupId })
      .populate('user', 'name email')
      .populate('group', 'name description');
    res.json(usersInGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all groups a specific user is part of
userGroupRouter.get('/user/:userId', async (req, res) => {
  try {
    const userGroups = await UserGroup.find({ user: req.params.userId })
      .populate('user', 'name email')
      .populate('group', 'name description');
    res.json(userGroups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a user's role in a group
userGroupRouter.put('/:id', async (req, res) => {
  try {
    const userGroup = await UserGroup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!userGroup) return res.status(404).json({ error: 'UserGroup entry not found' });
    res.json(userGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// REMOVE a user from a group
userGroupRouter.delete('/:id', async (req, res) => {
  try {
    const userGroup = await UserGroup.findByIdAndDelete(req.params.id);
    if (!userGroup) return res.status(404).json({ error: 'UserGroup entry not found' });
    res.json({ message: 'User removed from the group successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHECK if a user belongs to a specific group
userGroupRouter.get('/check/:userId/:groupId', async (req, res) => {
  try {
    const userGroup = await UserGroup.findOne({ user: req.params.userId, group: req.params.groupId });
    if (!userGroup) return res.status(404).json({ belongsToGroup: false });
    res.json({ belongsToGroup: true, role: userGroup.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userGroupRouter;
