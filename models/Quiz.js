const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  points: {
    type: Number,
    default: 1,
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [questionSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
