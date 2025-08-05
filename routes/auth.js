const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User"); // Capital 'U' for Mongoose models

// Register Route
router.post("/register2", async (req, res) => {
  try {
    const { email, password } = req.body;

    // No callback, just await
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login Route
router.post("/login2", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.json({ msg: "Login successful", user: { email: existingUser.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;

