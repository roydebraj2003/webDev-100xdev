const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

let users = [];
const JWT_SECRET = "helloworld";

// Authentication middleware
function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    req.username = decodedUser.username;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Get user profile
app.post("/me", auth, (req, res) => {
  const foundUser = users.find((user) => user.username === req.username);

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ username: foundUser.username });
});

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.status(201).json({ message: "User signed up" });
});

// Signin route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ message: "Signed in", token });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});