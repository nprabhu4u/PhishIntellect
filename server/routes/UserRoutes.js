import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "good-day");
    req.user = decoded; // Store decoded user info in `req.user` for use in the route
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

router.post("/signup", async (req, res) => {
  const { email, password, name, username, usertype } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      email,
      password,
      name,
      username,
      usertype,
    });

    await user.save();

    res.status(200).json({ message: "User Signup Successful!!" });
  } catch (err) {
    console.error("Error in /signup:", err.message);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = await user.generateAuthToken();

    res
      .status(200)
      .json({ message: "Login successful", token, userType: user.usertype });
  } catch (err) {
    console.error("Error in /login:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/secret", authenticateToken, async (req, res) => {
  res.send("this is a secret message");
});

router.post("/logout", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await verifyToken(token);
    const user = await User.findOne({ _id: decoded.id });
    if (user) {
      user.token = null;
      await user.save();
    }
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: "Logout failed" });
  }
});

export default router;
