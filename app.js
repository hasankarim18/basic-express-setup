const express = require('express')
const cors = require('cors')
const db = require('./db')


const app = express()

// middlewares
app.use(express.json())
app.use(cors())
const port = 5000;

app.get('/', (req, res)=> {
    res.send('School Database')
} )

// using name function rather than call back 

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

const addnewStudents = (req, res)=> {
    const newStudent = req.body
  
    db.getStudentsList()
    .then(students => {
         
          const lastStudent = students[students.length - 1];
         
          const lastStudentId = lastStudent.id;
          
          const newStudentId = parseInt(lastStudentId) + 1;
          newStudent.id = newStudentId; 
        //   console.log(students)
        //   console.log(newStudent)
          students.push(newStudent)      

          db.writeStudentData(students)
          .then(()=> {
             res.status(200).send({ message: "success", data: newStudent });
          })
          .catch(error => {
             console.log(error)
             res.status(400).send({ message: "failed", data:  error });
          })
    })
    .catch((err)=> {
         res.status(400).send({ message: "failed", data: { err } });
    })
}


app.get('/students', getStudents)

app.post('/students', addnewStudents)


app.listen(port, ()=> {
    console.log(`Listening to the port ${port}`)
})





