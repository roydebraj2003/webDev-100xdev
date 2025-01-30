const mongoose = require("mongoose");

// Correct Schema instantiation
const Schema = mongoose.Schema;

// Correct ObjectId reference
const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const TodoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Fix ObjectId reference
  title: String,
  done: { type: Boolean, default: false },
});

// Models
const UserModel = mongoose.model("users", UserSchema);
const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = {
  UserModel,
  TodoModel,
};
