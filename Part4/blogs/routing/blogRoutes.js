const blogRouter = require("express").Router();
const { blogModel, userModel } = require('../mongodb/models')
const mongoose = require("mongoose");
require('express-async-errors')

blogRouter.get('/', (req, res) => res.status(200).send('main api path'))

blogRouter.post("/blogs", async (req, res, next) => {
  let person = req.person
  person = await userModel.findOne({ username: person.username, name: person.name })
  if(!person) throw new Error('Token doesnt references any user')
  let newBlogData = {...req.body, author: person._id}
  if(!('likes' in newBlogData)) newBlogData['likes'] = 0
  if(!('title' in newBlogData) || !('url' in newBlogData)) throw new Error('Incorrect body syntax')
  const blog = new blogModel(newBlogData);
  try {
    let result = await blog.save()
    await userModel.findOneAndUpdate(person, {  
      blogs: person.blogs.concat(result._id)
    })
    res.status(201).json(result);
  } catch (error) {
    throw new Error(`Unable to save new blog: ${error}`)
  }
});

blogRouter.delete('/blogs/:id', async (req, res) => {
  let ps = req.person
  ps = await userModel.findOne({ username: ps.username, name: ps.name, hashedPassword: ps.password })
  if(!ps) throw new Error('JWT Error: user not found')
  let found = false
  let id = req.params.id;
  for(const ps_id of ps.blogs) if(id === ps_id.toString()) found = true
  if(!found) throw new Error('Error: The blog was not found for the indicated user')
  let newStatus = await blogModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id.toString()) })
  if(!newStatus) throw new Error('Error: blog not deleted')
  res.status(200).send(newStatus)
})

blogRouter.patch('/blogs/setlikes/:id?', async(req, res) => {
  let id = req.params.id
  let likes = req.query.likes
  if(!likes) return res.status(304).send('No likes query settled')
  let newStatus = await blogModel.findOneAndUpdate({ _id: id }, { likes })
  if(!newStatus) return res.status(304).send('ID not found')
  res.status(200).send(newStatus)
})

module.exports = blogRouter
