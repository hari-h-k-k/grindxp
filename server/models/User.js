const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "member"], default: "member" }, // User role in the group
  joinedAt: { type: Date, default: Date.now }, // When the user joined the group
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
