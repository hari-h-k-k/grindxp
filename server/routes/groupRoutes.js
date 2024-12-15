const express = require("express");
const mongoose = require("mongoose");
const Group = require("../models/Group"); // Adjust path to your Group model
const UserGroupModel = require("../models/UserGroup");

const groupRouter = express.Router();

// CREATE a new group
groupRouter.post("/", async (req, res) => {
  try {
    const group = new Group(req.body); // Expects name, description, createdBy
    await group.save();

    const userGroup = new UserGroupModel({
      user: req.body.createdBy, // Assuming createdBy is the user ID of the creator
      group: group._id,
      role: "admin", // Assign the user as admin
    });
    await userGroup.save();

    res.status(201).json({ group, userGroup });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all groups
groupRouter.get("/", async (req, res) => {
  try {
    const groups = await Group.find().populate("createdBy", "name email"); // Populates creator's name and email
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single group by ID
groupRouter.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a group by ID
groupRouter.put("/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a group by ID
groupRouter.delete("/:id", async (req, res) => {
  try {
    // First, delete all UserGroup entries associated with this group
    await UserGroupModel.deleteMany({ group: req.params.id });

    // Now, delete the group itself
    const group = await Group.findByIdAndDelete(req.params.id);
    
    if (!group) return res.status(404).json({ error: "Group not found" });

    res.json({ message: "Group and associated UserGroup entries deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = groupRouter;
