const mongoose = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: emailRegex,
    unique: true,
  },
  dob: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
