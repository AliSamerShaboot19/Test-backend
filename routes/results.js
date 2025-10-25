const express = require("express");
const QuizAttempt = require("../models/QuizAttempt");
const auth = require("../middleware/auth");
const router = express.Router();

// Get results for a specific quiz
router.get("/quiz/:quizId", auth, async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ quiz: req.params.quizId })
      .populate("student", "name email")
      .populate("quiz", "title")
      .sort({ submittedAt: -1 });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
