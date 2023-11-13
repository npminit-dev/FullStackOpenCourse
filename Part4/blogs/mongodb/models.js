const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const blogModel = new mongoose.model('blog', blogSchema)

module.exports = blogModel