const userRouter = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../env_vars.js')
const { userModel, blogModel } = require('../mongodb/models');
const express = require('express')
require('express-async-errors')

userRouter.use(express.json())

userRouter.get('/users', async (req, res) => {
  let users = await userModel.find({}, { username: 1, name: 1 })
    .populate('blogs', { title: 1, url: 1, author: 1 })
  res.status(200).send(users)
})

userRouter.get('/mix/blogs', async (req, res) => {
  let blogs = await blogModel.find({}, { title: 1, url: 1, likes: 1 })
    .populate('author', { username: 1 })
  res.status(200).send(blogs)
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
  let newUser = new userModel({ ...body, hashedPassword: hash })
  try {
    await newUser.save()
    res.status(201).send('User registered!')
  } catch (err) { throw new Error(`MongoDB Exception: ${err}`) }
})

userRouter.post('/users/login', async (req, res) => {
  let body = req.body.data ? JSON.parse(req.body.data) : req.body
  if(!body.username || !body.password) throw new Error('Incorrect body syntax')
  let user = await userModel.findOne({ username: body.username }, { name: 1, username: 1, hashedPassword: 1 })
  if(!user) throw new Error('Username not found')
  let match = await bcrypt.compare(body.password, user.hashedPassword)
  if(match) {
    jwt.sign({
      name: user.name,
      username: user.username,
      hashedPassword: user.hashedPassword
    }, SECRET, { expiresIn: '10days' }, async (err, token) => {
      if(err) throw new Error(`JWT sign error: ${err}`)
      res.status(200).send(token)
    })
  } else throw new Error('Incorrect password')
})

module.exports = userRouter