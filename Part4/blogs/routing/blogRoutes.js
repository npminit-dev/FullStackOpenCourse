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
  console.log(req.body)
  const blog = new blogModel(req.body);
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter
