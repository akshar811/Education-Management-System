const { Router } = require("express");
const { Teacher, student, Auth, authorize } = require("../middlewares/auth");
const {
  assignGrade,
  getGrades,
  getCourseAnalytics,
} = require("../controllers/grade.controller");

const gradeRoute = Router();

gradeRoute.post("/", Auth, Teacher, assignGrade);
gradeRoute.get("/", Auth, student, getGrades);
gradeRoute.get("/Analytics/:courseId", Auth, authorize, getCourseAnalytics);

module.exports = gradeRoute;
