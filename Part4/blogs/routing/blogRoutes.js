const blogRouter = require("express").Router();
const blogModel = require('../mongodb/models')
const log = require('../logs/log')

blogRouter.get('/', (req, res) => res.status(200).send('main api path'))

blogRouter.get("/blogs", (req, res) => {
  blogModel.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogRouter.post("/blogs", (req, res) => {
  let newBlogData = {...req.body}
  if(!('likes' in newBlogData)) newBlogData['likes'] = 0
  if(!('title' in newBlogData) || !('url' in newBlogData)) res.status(400).send()
  const blog = new blogModel(newBlogData);
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter
