const app = require('../index')
const supertest = require('supertest')
const mongoose = require('mongoose')
const blogModel = require('../mongodb/models')
const blogs = require('../utils/bloglist_example')

const api = supertest(app)

beforeEach(async () => {
  await blogModel.deleteMany({})
  for(const blog of blogs) {
    let newBlog = new blogModel(blog)
    await newBlog.save()
  }
})

describe.only('BLOGS REQUESTS', () => {
  test('get all blogs', async () => {
    let db_blogs = await api.get('/api/blogs')
    expect(db_blogs.body.length).toBe(blogs.length)
  })

  test('unique identifier as "id" checking', async () => {
    let blogs = (await api.get('/api/blogs')).body
    for(const blog of blogs) {
      expect(blog).toHaveProperty('id')
    }
  })

  test('verify new post created', async () => {
    let exampleBlog = {      
      title: "About Hawking radiation",
      author: "Stephen Hawking",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10
    }
    await api.post('/api/blogs').send(exampleBlog)
    let db_blogs = (await api.get('/api/blogs')).body
    expect(db_blogs.length).toBe(blogs.length + 1)
  })

  test('sets "likes" prop to 0 if not exists in the request body', async () => {
    let exampleBlog = {      
      title: "Maths in dinamics systems",
      author: "Euler",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    }
    await api.post('/api/blogs').send(exampleBlog)
    let db_blogs = (await api.get('/api/blogs')).body
    expect(db_blogs[db_blogs.length - 1].likes).toBe(0)
  })

  test('returns 400 code when "url" or "title" not exists in the request body', async () => {
    let exampleBlog = { 
      author: 'Alan Turing',
      likes: 100,
      title: 'Indecibility'
    }
    await api.post('/api/blogs')
      .send(exampleBlog)
      .expect(400)
  })
})

afterAll(async() => {
  mongoose.connection.close()
})