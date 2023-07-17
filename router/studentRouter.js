const express = require('express')
const db = require('../db')
const router = express.Router()


const getStudents = (req, res) => {
  db.getStudentsList()
    .then((students) => {
      res.status(200).send({ message: "success", data: students });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "failed", data: { err } });
    });
};

const addnewStudents = (req, res) => {
  const newStudent = req.body;

  db.getStudentsList()
    .then((students) => {
      const lastStudent = students[students.length - 1];

      const lastStudentId = lastStudent.id;

      const newStudentId = parseInt(lastStudentId) + 1;
      newStudent.id = newStudentId;
      //   console.log(students)
      //   console.log(newStudent)
      students.push(newStudent);

      db.writeStudentData(students)
        .then(() => {
          res.status(200).send({ message: "success", data: newStudent });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({ message: "failed", data: error });
        });
    })
    .catch((err) => {
      res.status(400).send({ message: "failed", data: { err } });
    });
};

router.route("/")
.get(getStudents)
.post(addnewStudents);


module.exports = router

