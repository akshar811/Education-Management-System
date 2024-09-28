const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  // student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  // fileUrl: { type: String },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
