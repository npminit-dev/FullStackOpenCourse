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
    expect(result).toBe(3832)
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
      _id: "6555a32a22aa0ed4ed2b3654",
      title: "About winning a WC",
      author: "65558cea306e32758ff9c45d",
      url: "https://afa.com.ar",
      likes: 3321,
      __v: 0,
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
      author: "65558cea306e32758ff9c45d",
      blogs: 2
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
      author: "65558cea306e32758ff9c45d",
      likes: 3499
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


