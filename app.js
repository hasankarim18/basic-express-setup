const express = require('express')
const cors = require('cors')
const studentRouter = require('./router/studentRouter')


const app = express()

// middlewares
app.use(express.json())
app.use(cors())
const port = 5000;

app.get('/', (req, res)=> {
    res.send('School Database')
} )

// using name function rather than call back 

app.use('/students', studentRouter)




app.listen(port, ()=> {
    console.log(`Listening to the port ${port}`)
})





