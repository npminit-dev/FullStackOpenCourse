import { likeBlogAsync, removeBlogAsync } from '../reduxstate/store'
import { useLocation, useParams } from 'react-router-dom'
import { appContext } from './contexts/AppContextProvider'
import { useContext, useEffect, useState } from 'react'
import { BlogProps } from '../types/types'

const Blog = (): JSX.Element => {
  
  const { id } = useParams()
  const [blogdata, setblogdata] = useState<BlogProps|null>()
  const { dispatch, user , blogs} = useContext(appContext)

  useEffect(() => {
    setblogdata(b => blogs.find(blog => blog.id === id))
  }, [blogs])

  const handleLikeIncrement = async (): Promise<any> => {
    blogdata && dispatch(likeBlogAsync({
      token: user.token || '',
      id: blogdata?.id,
      likes: blogdata?.likes + 1
    }))
  }

  const handleRemove = async (): Promise<any> => {
    blogdata && dispatch(removeBlogAsync({
      token: user.token || '',
      id: blogdata.id
    }))
  }

  return (
    <>
      {
        blogdata && 
        <div>
        <div>Author: {blogdata.author.username}</div>
        <div>Title: {blogdata.title}</div>        
        <div>URL: {blogdata.url}</div>
        <div>
          Likes: {blogdata.likes}
          {
          user.token !== null &&
          <button
            className='likebutton'
            title="Like blog Button"
            type="button"
            onClick={async () => await handleLikeIncrement()}
          >LIKE</button>
          }
          {
          (blogdata.author.username === user.username) && user.token !== null
            ? <button
            onClick={async () => await handleRemove()}
            title="Remove blog button"
            type="button"
          >REMOVE</button>
            : <></>
          }
        </div>
      </div>
      }
      <hr></hr>
    </>
  )
}

export default Blog
