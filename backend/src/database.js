require('dotenv').config()

const mongoose = require('mongoose')

const URL = process.env.MONGODB_URL || 'mongodb://localhost/FirstMern'
console.log('URL', URL)

mongoose.connect(URL, {})

const connection = mongoose.connection

connection.once('open', () => {
    console.log('DB is connected')
})