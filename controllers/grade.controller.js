const Assignment = require("../models/assignment.model");
const Course = require("../models/course.model");
const Grade = require("../models/grade.model");
const Quiz = require("../models/Quizemodel");

const assignGrade = async (req, res) => {
  try {
    const { studentId, courseId, gradeValue, assignmentId, quizId } = req.body;

    // Ensure that the teacher is assigned to the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure that the student is enrolled in the course
    if (!course.enrolledStudents.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in this course" });
    }

    // Check if grade is for assignment or quiz
    let assignment = null;
    let quiz = null;

    if (assignmentId) {
      assignment = await Assignment.findById(assignmentId);
      if (!assignment || assignment.course.toString() !== courseId) {
        return res
          .status(400)
          .json({ message: "Invalid assignment for this course" });
      }
    }

    if (quizId) {
      quiz = await Quiz.findById(quizId);
      if (!quiz || quiz.course.toString() !== courseId) {
        return res
          .status(400)
          .json({ message: "Invalid quiz for this course" });
      }
    }

    // Create a new grade record
    const grade = new Grade({
      student: studentId,
      course: courseId,
      assignment: assignmentId || null,
      quiz: quizId || null,
      grade: gradeValue,
    });

    await grade.save();

    res.status(201).json({ message: "Grade assigned successfully", grade });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGrades = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.enrolledStudents.includes(req.body.enrolledStudents)) {
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course" });
    }

    const grades = await Grade.find({
      course: courseId,
      student: req.body.enrolledStudents,
    }).populate("assignment quiz", "title");

    res.status(200).json({ grades });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Calculate the average grade and number of enrolled students for a course
const getCourseAnalytics = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Ensure that the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 1. Aggregate average grade per course
    const averageGradePipeline = [
      { $match: { course: courseId } },
      {
        $group: {
          _id: "$course",
          averageGrade: { $avg: "$grade" },
        },
      },
    ];

    const averageGradeResult = await Grade.aggregate(averageGradePipeline);

    const averageGrade =
      averageGradeResult.length > 0 ? averageGradeResult[0].averageGrade : null;

    // 2. Count the number of enrolled students
    const enrolledStudentsCount = await Course.aggregate([
      { $match: { _id: course._id } },
      { $project: { numberOfStudents: { $size: "$enrolledStudents" } } },
    ]);

    const numberOfStudents =
      enrolledStudentsCount.length > 0
        ? enrolledStudentsCount[0].numberOfStudents
        : 0;

    // Send the response with both average grade and number of students
    res.status(200).json({
      course: course.title,
      averageGrade,
      numberOfStudents,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { assignGrade, getGrades, getCourseAnalytics };
