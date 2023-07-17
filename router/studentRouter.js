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

const updateStudent = (req, res)=> {
    const id = parseInt(req.params.id)
    const updatedData = req.body
    db.getStudentsList()
    .then(students => {
        const index = students.findIndex(item => item.id === id)
         students[index] = updatedData        
         res.send({ message: "ok", data: students });
    })    
}


const deleteStudent = (req, res)=> {
    const id = parseInt(req.params.id)
    db.getStudentsList()
    .then((students)=> {
        const deletedStudent = students.find(item => item.id === id)
        const updatedData = students.filter(item => item.id !== id)
        db.writeStudentData(updatedData)
        .then(()=> {
            res.send({ message: "ok", data: deletedStudent });
        })
    })
}

const studentDetail = (req, res)=> {
    const id = parseInt(req.params.id)
    db.getStudentsList()
    .then((students)=> {
        const selectedStudent = students.find(item => item.id === id)
        if(selectedStudent){
            res.send({message:"ok", data: selectedStudent })
        }else {
            res.status(404).send({message:"Data Not Found", data: {}})
        }
    })
    .catch(error => {
         res
           .status(400)
           .send({ message: "Error", data: error });
    })
}

router.route("/")
.get(getStudents)
.post(addnewStudents);

router.route("/:id")
.get(studentDetail)
.put(updateStudent)
.delete(deleteStudent)



module.exports = router

