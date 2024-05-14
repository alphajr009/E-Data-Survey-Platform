const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// REGISTER
router.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name } = req.body;
      const newUser = new User(email, password, name);
      await newUser.save();
      return res.status(201).send(`User ${newUser.name} created successfully.`);
    } catch (error) {
      if (error.message === "Email already exists") {
        return res.status(400).send("Email already registered.");
      }
      console.error("Error registering user:", error);
      return res.status(500).send("Registration failed.");
    }
  }
);

// LOGIN
router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).send("User not found.");
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(400).send("Incorrect password.");
      }
      return res.status(200).json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).send("Login failed. Please try again.");
    }
  }
);

module.exports = router;
