const { validationResult } = require("express-validator");
const User = require("../models/User");

async function getProfile(req, res) {
  // req.user set by middleware
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    phone: req.user.phone,
    role: req.user.role
  });
}

async function updateProfile(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: "Validation error", errors: errors.array() });

  const { username, phone } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (typeof username === "string" && username.trim().length >= 2) user.username = username.trim();
  if (typeof phone === "string") user.phone = phone.trim();

  await user.save();

  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    role: user.role
  });
}

module.exports = { getProfile, updateProfile };
