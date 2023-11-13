const { returnANumber, getAllLikes, favoriteBlog, mostBlogs, getMostLikedBlog, getMostLikedAuthor } = require('../utils/list_helper')
const blogs = require('../utils/bloglist_example')

describe('testing jest', () => {
  test('test', () => {
    let result = returnANumber([])
    expect(result).toBe(1)
  })
})

describe('blogs utils testing', () => {

  // getAllLikes
  test('all likes from a list of blogs', () => {
    let result = getAllLikes(blogs)
    expect(result).toBe(2341)
  })

  test('all likes from a empty', () => {
    let result = getAllLikes([])
    expect(result).toBe(null)
  })

  test('all likes from a invalid entry', () => {
    let result = getAllLikes('')
    expect(result).toBe(null)
  })

  /* ------------- */

  // favoriteBlog
  test('most liked blog from a list of blogs', () => {
    let result = favoriteBlog(blogs)
    expect(result).toEqual({
      _id: "5a432bc61b54a676234d17da",
      title: "Relativity",
      author: "Albert Einstein",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2300,
      __v: 0
    })
  })

  test('most liked blog from a empty blogs', () => {
    let result = favoriteBlog([])
    expect(result).toEqual(null)
  })

  test('most liked blog from incorrect entry type', () => {
    let result = favoriteBlog('')
    expect(result).toEqual(null)
  })

  /* --------- */

  // mostBlogs
  test('most blogs by author from a list of blogs', () => {
    let result = mostBlogs(blogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('most blogs by author from a empty list', () => {
    let result = mostBlogs([])
    expect(result).toBe(null)
  })

  test('most blogs by author from a incorrect entry type', () => {
    let result = mostBlogs('')
    expect(result).toBe(null)
  })

  /* --------- */

  // getMostLikedAuthor
  test('most liked author from a blog list', () => {
    let result = getMostLikedAuthor(blogs)
    expect(result).toEqual({
      author: "Albert Einstein",
      likes: 2300
    })
  })

  test('most liked author from a empty list', () => {
    let result = getMostLikedAuthor([])
    expect(result).toBe(null)
  })

  test('most liked author from a blog list', () => {
    let result = getMostLikedAuthor('')
    expect(result).toBe(null)
  })
})


