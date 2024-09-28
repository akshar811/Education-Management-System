const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  questions: [
    { questionText: String, options: [String], correctAnswer: String },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
