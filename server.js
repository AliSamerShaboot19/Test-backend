const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Middleware - السماح لجميع الروابط
app.use(cors({
  origin: "*", // السماح لجميع النطاقات
  credentials: false, // إذا كنت لا تستخدم cookies أو authentication يمكن تركه false
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/attempts", require("./routes/attempts"));
app.use("/api/results", require("./routes/results"));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
