const log = require('./logs/log')
const blogRouter = require('./routing/blogRoutes')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MNGDB_KEY, PORT, SECRET } = require('./env_vars')
const morgan = require('morgan')
const userRouter = require('./routing/userRoutes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { errorsMW, extractPersonMW } =  require('./utils/middlewares')
require('express-async-errors')

let app = express()

const mongoUrl = `mongodb+srv://jorgebdevacc:${MNGDB_KEY}@cluster0.mszdubf.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', userRouter)
app.use('/api', extractPersonMW, blogRouter)
app.use('/api', errorsMW)

app.listen(PORT, () => {
  log.success(`Server running on port ${PORT}`)
})

module.exports = app