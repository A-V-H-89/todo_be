const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const authRouter = require('./authRouter')


const app = express()

app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use('/auth', authRouter)




const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/movieboxx')
        app.listen(PORT, () => console.log(`Server started successful on ${PORT} port`))
    } catch(error) {
        console.log(error)
    }
}

start()

