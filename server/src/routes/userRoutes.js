const express = require("express");
const { body } = require("express-validator");
const { requireAuth } = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", requireAuth, getProfile);

router.put(
  "/profile",
  requireAuth,
  [
    body("username").optional().isString().isLength({ min: 2 }).withMessage("username min 2"),
    body("phone").optional().isString().isLength({ max: 30 }).withMessage("phone too long")
  ],
  updateProfile
);

module.exports = router;
