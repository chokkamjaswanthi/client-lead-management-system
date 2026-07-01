const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Register Admin
router.post("/register", authController.register);

// Login Admin
router.post("/login", authController.login);

module.exports = router;