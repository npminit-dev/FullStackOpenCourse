import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { comment_Blog, get_Blogs, get_User_Blogs, like_Blog, log_in, post_Blog, remove_Blog, sign_in } from '../utils/userRequests.js'
import { BlogProps, CommentType, LoginBasicData, SignInBasicData, User, likePostAsyncType, postAsyncType, removeBlogsAsyncType } from '../types/types.js';
import { decodeJWT } from '../utils/utils.js';
import { UserAndBlogs } from '../types/types';

export const getAllBlogsAsync = createAsyncThunk(
  'blogs/getAllBlogsAsync',
  async () => {
    let blogs = await get_Blogs()
    return blogs.data
  }
)

export const postBlogAsync = createAsyncThunk(
  'blogs/postBlogAsync',
  async (data: postAsyncType) => {
    let userdata = decodeJWT(data.token) as User
    let result = (await post_Blog(data.token, data.blog)).data
    result.author = { id: result.author, username: userdata.username }
    return result
  }
)

export const likeBlogAsync = createAsyncThunk(
  'blogs/likeBlogAsync',
  async (data: likePostAsyncType) => {
    if(!data.token || !data.id) {
      console.log('token or id not found')
      return
    }
    await like_Blog(...Object.values(data) as [string, string, number])
    return data.id
  }
)

export const removeBlogAsync = createAsyncThunk(
  'blogs/removeBlogAsync',
  async (data: removeBlogsAsyncType) => {
    let result = await remove_Blog(...Object.values(data) as [string, string])
    return result.data
  }
)

export const commentBlogAsync = createAsyncThunk(
  'blogs/commentBlogAsync',
  async (data: CommentType) => {
    let result = await comment_Blog(data.comment, data.id)
    return {id: data.id, comments: result.data.comments}
  }
)

export const loginAsync = createAsyncThunk(
  'user/login',
  async (data: LoginBasicData) => {
    try {
      let result = await log_in(data)
      localStorage.setItem('lsssstkn', result.data)
      let userdata: any = decodeJWT(result.data)
      return { 
        name: userdata.name, 
        username: userdata.username, 
        token: result.data 
      }
    } catch(err) {
      console.log(err)
      return
    } 
  }
)

export const signInAsync = createAsyncThunk(
  'user/signin',
  async (data: SignInBasicData) => {
    try {
      let result = await sign_in(data)
      return result
    } catch(err) {
      console.log(err)
      return
    }
  }
)

export const getUsersBlogsAsync = createAsyncThunk(
  'userblogs',
  async () => {
    try {
      let result = await get_User_Blogs()
      return result.data
    } catch(err) {
      console.log(err)
      return []
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
      return state.concat(action.payload)
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
      return state.map(blog => {
        if(blog.id === action.payload) return { ...blog, likes: blog.likes + 1 }
        return blog
      })
    })
    builder.addCase(removeBlogAsync.fulfilled, (state, action) => {
      return state.filter(blog => blog.id !== action.payload.id)
    })
    builder.addCase(commentBlogAsync.fulfilled, (state, action) => {
      return state.map(blog => {
        if(blog.id === action.payload.id) {
          return {...blog, comments: action.payload.comments}
        }
        return blog
      })
    })
  }
})

export const userBlogsSlice = createSlice({
  name: 'userblogs',
  initialState: [] as UserAndBlogs[],
  reducers: {
    setUserAndBlogs: function(state, action) {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersBlogsAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {name: '', username: '', token: ''} as User&{token:string},
  reducers: {
    logWithStorage: function() {
      let token = localStorage.getItem('lsssstkn')
      if(!token) return
      let userdata = decodeJWT(token)
      if(userdata instanceof Error) return
      return {token, ...userdata}
    },
    logOutUser: function() {
      localStorage.removeItem('lsssstkn');
      return {name: '', token: '', username: ''}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const store = configureStore<any>({
  reducer: {
    blogs: blogsSlice.reducer,
    user: userSlice.reducer,
    userblogs: userBlogsSlice.reducer
  }
})

export const { addBlog, getAllBlogs, likeblog, removeBlog, setBlogs } = blogsSlice.actions
export const { logWithStorage, logOutUser } = userSlice.actions
export const { setUserAndBlogs } = userBlogsSlice.actions

export type AppDispatch = typeof store.dispatch





