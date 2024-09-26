const { Router } = require("express");
const { addCoures, updateCourse, deleteCourse, selfEnroll, submitAssignment, enrollStudent, removeStudent, getEnrolledCourses, getMySubmissions, updateSubmission, deleteSubmission } = require("../controllers/coures.controller")
const { Auth, authorize, admin, student } = require("../middlewares/auth");
const courseRoute = Router();

courseRoute.post("/add", authorize, addCoures);
courseRoute.patch("/upadate/:id", Auth, authorize, updateCourse);
courseRoute.delete("/delete/:id", admin, deleteCourse);
courseRoute.post("/self", Auth, student, selfEnroll);
courseRoute.post("/submit", Auth, student, submitAssignment);
courseRoute.post("/enroll", Auth, admin, enrollStudent);
courseRoute.post("/remove", Auth, admin, removeStudent);
courseRoute.get("/getenroll", Auth, student, getEnrolledCourses);
courseRoute.get("/my-submissions", Auth, student, getMySubmissions);
courseRoute.patch("/upadatesub/:id", Auth, student, updateSubmission);
courseRoute.delete("/deletesub/:id", Auth, student, deleteSubmission);

module.exports = courseRoute;
