const express = require("express");
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all quizzes for teacher
router.get("/", auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all active quizzes for students
router.get("/active", auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isActive: true })
      .populate("teacher", "name")
      .sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single quiz
router.get("/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create quiz
router.post("/", auth, async (req, res) => {
  try {
    const quiz = new Quiz({
      ...req.body,
      teacher: req.user.id,
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update quiz
router.put("/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete quiz
router.delete("/:id", auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
