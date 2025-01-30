const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { auth, jwtSecret } = require("./auth.js");
const { UserModel, TodoModel } = require("./db.js");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:JLVuQQ0ogqdSiNgc@cluster0.29zvt.mongodb.net/todo"
);

// Login Route
app.post("/signin", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(30),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsedDataWithSuccess.error.errors, // Return only errors
    });
  }

  const { email, password } = req.body;

  try {
    const response = await UserModel.findOne({ email });

    if (!response) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, response.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: response._id.toString() }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User successfully logged in",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error signing in",
      error: error.message,
    });
  }
});

// Signup Route
app.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(30),
    name: z.string().min(2).max(50),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsedDataWithSuccess.error.errors,
    });
  }

  const { email, password, name } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "You are signed up" });
  } catch (error) {
    return res.status(500).json({
      message: "Error signing up",
      error: error.message,
    });
  }
});

// Create Todo Route
app.post("/todo", auth, async function (req, res) {
  const { title, done } = req.body;
  const userId = req.userId;

  if (!title) {
    return res.status(400).json({ message: "Please provide the title" });
  }

  try {
    const newTodo = new TodoModel({ userId, title, done: done || false });
    const savedTodo = await newTodo.save();

    return res.status(201).json({
      message: "Successfully added a todo",
      todo: savedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating todo",
      error: error.message,
    });
  }
});

// Get All Todos for a User
app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const todos = await TodoModel.find({ userId });
    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching todos",
      error: error.message,
    });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
