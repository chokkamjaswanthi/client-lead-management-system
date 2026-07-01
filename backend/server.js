const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = true;

  console.log("MongoDB Connected");
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database Connection Failed",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});

module.exports = app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}