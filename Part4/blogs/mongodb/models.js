const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  },
  url: String,
  likes: Number,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  hashedPassword: String,
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'blogs'
    }
  ]
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const userModel = new mongoose.model("users", userSchema);
const blogModel = new mongoose.model("blogs", blogSchema);

module.exports = {
  blogModel,
  userModel
};
