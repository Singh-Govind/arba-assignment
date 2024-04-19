const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: { type: String },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const UserModel = mongoose.model("user", userSchema, "user");

module.exports = UserModel;
