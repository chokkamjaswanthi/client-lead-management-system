const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// Register Admin
// =======================
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration Successful",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Login Admin
// =======================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find Admin
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // Create JWT Token
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};