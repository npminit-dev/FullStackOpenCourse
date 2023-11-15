const log = require('./logs/log')
const blogRouter = require('./routing/blogRoutes')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MNGDB_KEY, PORT } = require('./env_vars')
const morgan = require('morgan')

let app = express()

const mongoUrl = `mongodb+srv://jorgebdevacc:${MNGDB_KEY}@cluster0.mszdubf.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => res.status(200).send('main path'))

app.use('/api', blogRouter)

app.listen(PORT, () => {
  log.success(`Server running on port ${PORT}`)
})

module.exports = app