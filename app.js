const express = require('express')
const cors = require('cors')


const app = express()

// middlewares
app.use(express.json())
app.use(cors())
const port = 5000;

app.get('/', (req, res)=> {
    res.send('School Database')
} )


app.listen(port, ()=> {
    console.log(`Listening to the port ${port}`)
})





