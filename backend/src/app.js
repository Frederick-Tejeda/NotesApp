const express = require('express')
const cors = require('cors')
const app = express()

// Settings

app.set('PORT', process.env.PORT || 4000)

// Middlewares

app.use(cors())
app.use(express.json())

//Routes

app.get('/', (req, res) => res.send("What's up!"))

app.use('/users', require('./routes/users'))
app.use('/notes', require('./routes/notes'))

module.exports = app;