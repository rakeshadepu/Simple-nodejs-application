const express = require("express");
const { getProfile } = require("../controllers/profileController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const router = express.Router();

//routes for getting profile details
router.get("/profile", protect, getProfile);

module.exports = router;
