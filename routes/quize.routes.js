const { Router } = require("express");
const { Auth, Teacher } = require("../middlewares/auth");
const {
  uploadAssignment,
  createQuiz,
} = require("../controllers/quize.controller");
const quizeRouete = Router();

quizeRouete.post("/upload-assignment", Auth, Teacher, uploadAssignment);
quizeRouete.post("/create-quiz", Auth, Teacher, createQuiz);

module.exports = quizeRouete;
