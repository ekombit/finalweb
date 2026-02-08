const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").isString().isLength({ min: 2 }).withMessage("username required"),
    body("email").isEmail().withMessage("valid email required"),
    body("password").isString().isLength({ min: 8 }).withMessage("password min 8"),
    body("phone").optional().isString().isLength({ min: 0, max: 30 })
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("valid email required"),
    body("password").isString().isLength({ min: 8 }).withMessage("password min 8")
  ],
  login
);

module.exports = router;
