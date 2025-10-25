const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Middleware - الإصلاح هنا
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/attempts", require("./routes/attempts"));
app.use("/api/results", require("./routes/results"));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

