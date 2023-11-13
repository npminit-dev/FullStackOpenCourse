const log = require("../logs/log")
const blogs = require('./bloglist_example')

const returnANumber = ([]) => {
  return 1
}

const getAllLikes = (blogs) => Array.isArray(blogs) ? blogs.reduce((acc, curr) => acc += curr.likes, 0) || null : null

const favoriteBlog = (blogs) => {
  if(!Array.isArray(blogs)) return null
  let mostLiked;
  blogs.forEach(blog => {
    if(!mostLiked) mostLiked = blog
    else {
      if(blog.likes > mostLiked.likes) {
        mostLiked = blog
      }
    }
  })
  return mostLiked || null;
} 

const mostBlogs = (blogs) => {
  if(!Array.isArray(blogs)) return null
  let reduced = [...blogs]
  reduced = reduced.reduce((acc, curr) => {
    let idx = acc.findIndex(blog => blog.author === curr.author)
    if(idx < 0) acc.push({ author: curr.author, blogs: 1 })
    else acc[idx].blogs += 1
    return acc
  }, [])
  return reduced.sort((a, b) => a.blogs < b.blogs ? 1 : -1)[0] || null
}

const getMostLikedAuthor = (blogs) => {
  if(!Array.isArray(blogs)) return null
  let reduced = [...blogs]
  reduced = reduced.reduce((acc, curr) => {
    let idx = acc.findIndex(blog => blog.author === curr.author)
    if(idx < 0) acc.push({ author: curr.author, likes: curr.likes })
    else acc[idx].likes += curr.likes
    return acc
  }, [])
  return reduced.sort((a, b) => a.likes < b.likes ? 1 : -1)[0] || null
}

module.exports = {
  returnANumber,
  getAllLikes,
  favoriteBlog,
  mostBlogs,
  getMostLikedAuthor
}