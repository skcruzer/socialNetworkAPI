const express = require('express')
const { join } = require('path')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useFindAndModify: false,
  useNewURLParser: true,
  useUnifiedTopology: true
})

// this will log mongo queries being executed
mongoose.set('debug', true)

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`))