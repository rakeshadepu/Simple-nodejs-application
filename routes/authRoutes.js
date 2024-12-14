const express = require("express");
const { signup, login,verifyEmail } = require("../controllers/authController.js");
const router = express.Router();

//routes for login,sinup and verifying email
router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);

module.exports = router;