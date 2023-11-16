const app = require('../index')
const request = require('supertest')
const mongoose = require('mongoose')
const { blogModel, userModel } = require('../mongodb/models')
const blogs = require('../utils/bloglist_example')
const users = require('../utils/userlist_example')
const auth = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2VjcmFjayIsIm5hbWUiOiJNaWtlIENyYWNrIiwicGFzc3dvcmQiOiIkMmIkMDUkUDA3UmpkSGlDMEFqTGtNOHR1aXc5ZVkwdHlhMUpmRkJuLy82MDJJS3hmQ3RrVzBKZENrQmUiLCJpYXQiOjE3MDAwODY3NzgsImV4cCI6MTcwMDk1MDc3OH0.bZL-Xsa2WRKcw5cAPqFYwFXH9JCdr3HB5vqqop3XFRA'

beforeEach(async () => {
  await blogModel.deleteMany({})
  for(const blog of blogs) {
    let newBlog = new blogModel(blog)
    await newBlog.save()
  }
  await userModel.deleteMany({})
  for(const user of users) {
    let newUser = new userModel(user)
    await newUser.save()
  }
})

describe.only('BLOGS REQUESTS', () => {
  test('get all blogs', async () => {
    let response = await request(app).get('/api/blogs').set("authorization", auth)
    expect(response.body.length).toBe(blogs.length)
  })

  test('unique identifier as "id" checking', async () => {
    let response = await request(app).get('/api/blogs').set("authorization", auth)
    for(const blog of response.body) {
      expect(blog).toHaveProperty('id')
    }
  })

  test('verify new post created', async () => {
    let exampleBlog = {      
      title: "About Hawking radiation",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10
    }
    await request(app).post('/api/blogs').set("authorization", auth).send(exampleBlog)
    let db_blogs = (await request(app).get('/api/blogs').set("authorization", auth)).body
    expect(db_blogs.length).toBe(blogs.length + 1)
  })

  test('sets "likes" prop to 0 if not exists in the request body', async () => {
    let exampleBlog = {      
      title: "Maths in dinamics systems",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    }
    await request(app).post('/api/blogs').set("authorization", auth).send(exampleBlog)
    let db_blogs = (await request(app).get('/api/blogs').set("authorization", auth)).body
    expect(db_blogs[db_blogs.length - 1].likes).toBe(0)
  })

  test('returns 400 code when "url" or "title" not exists in the request body', async () => {
    let exampleBlog = { 
      author: 'Alan Turing',
      likes: 100,
      title: 'Indecibility'
    }
    let res = await request(app).post('/api/blogs').set("authorization", auth).send(exampleBlog)
  })
})

afterAll(async() => {
  mongoose.connection.close()
})