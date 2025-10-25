const express = require("express");
const QuizAttempt = require("../models/QuizAttempt");
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");
const router = express.Router();

// Submit quiz attempt
router.post("/", auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    let totalPoints = 0;
    const processedAnswers = [];

    quiz.questions.forEach((question, index) => {
      totalPoints += question.points;
      const userAnswer = answers[index];
      const isCorrect =
        userAnswer !== null && question.options[userAnswer]?.isCorrect;

      if (isCorrect) {
        score += question.points;
      }

      processedAnswers.push({
        question: question._id,
        selectedOption: userAnswer,
        isCorrect,
      });
    });

    const attempt = new QuizAttempt({
      student: req.user.id,
      quiz: quizId,
      answers: processedAnswers,
      score,
      totalPoints,
    });

    await attempt.save();
    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student's attempts
router.get("/my-attempts", auth, async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user.id })
      .populate("quiz", "title description")
      .sort({ submittedAt: -1 });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
