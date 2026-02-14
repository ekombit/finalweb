const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

function signToken(userId) {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
}

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: "Validation error", errors: errors.array() });

  const { username, email, password, phone } = req.body;

  const exists = await User.findOne({ email: email.toLowerCase() });
if (exists) return res.status(409).json({ message: "Email already in use" });

//  first user becomes admin
const usersCount = await User.countDocuments();
const role = usersCount === 0 ? "admin" : "user";

const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({
  username,
  email: email.toLowerCase(),
  passwordHash,
  phone: phone || "",
  role
});


  const token = signToken(user._id);

  res.status(201).json({
    token,
    user: { id: user._id, username: user.username, email: user.email, phone: user.phone, role: user.role }
  });
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: "Validation error", errors: errors.array() });

  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid email or password" });

  const token = signToken(user._id);

  res.json({
    token,
    user: { id: user._id, username: user.username, email: user.email, phone: user.phone, role: user.role }
  });
}

module.exports = { register, login };
