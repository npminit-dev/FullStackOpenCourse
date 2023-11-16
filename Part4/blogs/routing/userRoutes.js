const userRouter = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('express-async-errors')
const { SECRET } = require('../env_vars.js')
const { userModel } = require('../mongodb/models');

userRouter.get('/users', async (req, res) => {
  let users = await userModel.find({}, { username: 1, name: 1 })
    .populate('blogs', { title: 1, url: 1, author: 1 })
  res.status(200).send(users)
})

userRouter.post('/users/signin', async (req, res, next) => {
  let body = req.body;
  if(!body) throw new Error('No body received')
  if(!body.username || !body.name || !body.password) throw new Error('One or some properties has missing')
  if(!/^[\wáéíóúÁÉÍÓÚ ]{3,30}$/gm.test(body.username)) throw new Error('Invalid username')
  if(!/^[\wáéíóúÁÉÍÓÚ ]{3,30}$/gm.test(body.name)) throw new Error('Invalid name')
  if(!/^.{3,30}$/gm.test(body.password)) throw new Error('Invalid password')
  let hash = await bcrypt.hash(body.password, 5)
  body.password = hash
  jwt.sign(body, SECRET, { expiresIn: '10days' }, async (_, token) => {
    let newUser = new userModel({ ...body, hashedPassword: hash })
    try {
      await newUser.save()
      res.status(200).send(token)
    } catch (err) { next(new Error(`MongoDB Exception: ${err}`)) }
  })
})

module.exports = userRouter