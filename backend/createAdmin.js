const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit();
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create Admin
    await Admin.create({
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("✅ Admin Created Successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

createAdmin();