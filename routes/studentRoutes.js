const express = require("express");
const router = express.Router();
const students = require("../data/students");

// Get all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// Get one student by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// Add new student
router.post("/", (req, res) => {
  const name = req.body.name;
  const course = req.body.course;

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name: name,
    course: course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const name = req.body.name;
  const course = req.body.course;

  if (name) student.name = name;
  if (course) student.course = course;

  res.status(200).json(student);
});

// Delete student
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.status(200).json({ message: "Student deleted" });
});

module.exports = router;