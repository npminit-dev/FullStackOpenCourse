const log = require("./logs/log");
const blogRouter = require("./routing/blogRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MNGDB_KEY, PORT } = require("./env_vars");
const morgan = require("morgan");
const userRouter = require("./routing/userRoutes");
const { errorsMW, extractPersonMW } = require("./utils/middlewares");
const resetRouter = require("./routing/resetRouter");
const { blogModel } = require("./mongodb/models");
require("express-async-errors");
require("dotenv").config();
const path = require('path')

let app = express();

const mongoUrl = `mongodb+srv://jorgebdevacc:${MNGDB_KEY}@cluster0.mszdubf.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

console.log()

app.get("/api/blogs", async (req, res) => {
  let blogs = await blogModel
  .find({})
  .populate("author", { username: 1, name: 1 });
  res.status(200).json(blogs);
});

app.use("/api", userRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/testUtils", resetRouter);
}

app.post("/api/blogs/comment/:id", async (req, res) => {
  let comment = req.body.commentBody;
  let blogID = req.params.id;
  let commentsArray = (
    await blogModel.findOne({ _id: new mongoose.Types.ObjectId(blogID) })
  ).comments;
  let result = await blogModel.findOneAndUpdate(
    { _id: blogID },
    { comments: [...(commentsArray || []), comment] },
    { new: true }
    );
    res.status(201).send(result);
  });
  
app.use("/api", extractPersonMW, blogRouter);
app.use("/api", errorsMW);

app.use(express.static(path.join(__dirname, 'public/dist')))

app.listen(PORT, () => {
  log.success(`Server running on port ${PORT}`);
});

module.exports = app;
