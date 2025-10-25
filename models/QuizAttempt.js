const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  selectedOption: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const quizAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  answers: [answerSchema],
  score: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
