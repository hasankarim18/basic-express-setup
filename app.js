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



app.get('/students', (req, res)=> {
   db.getStudentsList()
     .then((students) => {
       res.status(200).send({ message: "success", data:  students  });
     })
     .catch((err) => {
        console.log(err)
       res.status(400).send({ message: "failed", data: { err } });
     });
} )


app.listen(port, ()=> {
    console.log(`Listening to the port ${port}`)
})





