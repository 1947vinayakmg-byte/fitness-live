const bcrypt = require("bcryptjs");
const express = require("express");

const router = express.Router();

const User = require("../models/user");

router.post("/save-user", async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        photo,
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed To Save User",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({
      success: true,
      message: "Signup Success 🎉",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Signup Failed ❌",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong password",
      });
    }
    res.json({
      success: true,
      message: "Login Success 🎉",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Login Failed ❌",
    });
  }
});

router.get("/get-user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: "Error fetching user" });
  }
});

router.put("/update-profile", async (req, res) => {
  try {
    const { email, name, age, weight, height } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { name, age, weight, height },
      { new: true }
    );
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: "Error updating profile" });
  }
});

router.put("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error resetting password" });
  }
});

module.exports = router;