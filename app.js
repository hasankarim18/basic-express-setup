const express = require('express')
const cors = require('cors')
const fs = require('fs')


const app = express()

// middlewares
app.use(express.json())
app.use(cors())
const port = 5000;

app.get('/', (req, res)=> {
    res.send('School Database')
} )


app.get('/students', (req, res)=> {
    fs.readFile('./database/student.json', (err, data)=> {
        const students = JSON.parse(data)       
        res.send(students)
    })
} )


app.listen(port, ()=> {
    console.log(`Listening to the port ${port}`)
})





