import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, get_Blogs, like_Blog, log_in, post_Blog, remove_Blog } from '../utils/userRequests.js'
import { BlogProps, LoginBasicData, PostBlogProps, User, likePostAsyncType, postAsyncType, removeBlogsAsyncType } from '../types/types.js';
import { decodeJWT } from '../utils/utils.js';

export const getAllBlogsAsync = createAsyncThunk(
  'blogs/getallblogsasync',
  async () => {
    let blogs = await get_Blogs()
    return blogs.data
  }
)

export const postBlogAsync = createAsyncThunk(
  'blogs/postblogsasync',
  async (data: postAsyncType) => {
    let result = await post_Blog(data.token, data.blog)
    return result.data
  }
)

export const likeBlogAsync = createAsyncThunk(
  'blogs/likeblogasync',
  async (data: likePostAsyncType) => {
    let result = await like_Blog(...Object.values(data) as [string, string, number])
    return result.data
  }
)

export const removeBlogAsync = createAsyncThunk(
  'blogs/removeblogasync',
  async (data: removeBlogsAsyncType) => {
    let result = await remove_Blog(...Object.values(data) as [string, string])
    return result.data
  }
)

export const loginAsync = createAsyncThunk(
  'user/login',
  async (data: LoginBasicData) => {
    let result = await log_in(data)
    localStorage.setItem('lsssstkn', JSON.stringify(result.data))
    let userdata: any = decodeJWT(result.data)
    return { 
      name: userdata.name, 
      username: userdata.username, 
      token: result.data 
    }
  }
)

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [] as BlogProps[],
  reducers: {
    getAllBlogs: function(state, action) {
      return state
    },
    setBlogs: function(state, action) {
      return action.payload
    },
    addBlog: function(state, action) {
      state.push(action.payload)
    },
    likeblog: function(state: BlogProps[], action) {
      state.forEach(blog => {
        if(blog.id === action.payload) blog.likes ++
      })
    },
    removeBlog: function(state, action) {
      state.filter(blog => blog !== action.payload)
    }
  },
  extraReducers: function(builder) {
    builder.addCase(getAllBlogsAsync.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(postBlogAsync.fulfilled, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(likeBlogAsync.fulfilled, (state, action) => {
      state.forEach(blog => {
        if(action.payload.id === blog.id) blog.likes++
      })
    })
    builder.addCase(removeBlogAsync.fulfilled, (state, action) => {
      return state.filter(blog => blog.id !== action.payload.id)
    })
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {name: '', username: '', token: ''} as User&{token:string},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const store = configureStore({
  reducer: {
    blogs: blogsSlice.reducer,
    user: userSlice.reducer
  }
})

export const { addBlog, getAllBlogs, likeblog, removeBlog, setBlogs } = blogsSlice.actions

export type AppDispatch = typeof store.dispatch





