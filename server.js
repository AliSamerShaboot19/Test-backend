const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1. أولاً: الاتصال بقاعدة البيانات
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // إغلاق التطبيق إذا فشل الاتصال
  }
};
connectDB();

// 2. ثانياً: middleware الأساسية
app.use(cors());
app.use(express.json());

// 3. ثالثاً: تحميل Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/attempts", require("./routes/attempts"));
app.use("/api/results", require("./routes/results"));

// 4. رابعاً: معالجة الأخطاء (Error Handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 5. أخيراً: تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
