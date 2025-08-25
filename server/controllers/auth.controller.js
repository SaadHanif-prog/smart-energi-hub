// server.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = "your_secret_key";

const users = [];

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // check if user exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: has });
  res.json({ message: "User registered successfully" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware to protect routes
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Protected route
app.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!`, user: req.user });
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
