import type { BlogProps } from '../types/types'
import Toggle from './Toggle'
import { like_Blog, remove_Blog } from '../utils/userRequests'
import { useDispatch } from 'react-redux'
import { AppDispatch, likeBlogAsync, removeBlogAsync } from '../reduxstate/store'

const Blog = (props: BlogProps): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>()

  const handleLikeIncrement = async (): Promise<any> => {
    dispatch(likeBlogAsync({
      token: props.token || '',
      id: props.id,
      likes: props.likes + 1
    }))
  }

  const handleRemove = async (): Promise<any> => {
    dispatch(removeBlogAsync({
      token: props.token || '',
      id: props.id
    }))
  }

  return (
    <>
      <div className="blogbox">
        <span className='authorbox'>Author: {props.author.username}</span>
        <span className='titlebox'>Title: {props.title}</span>
        <Toggle showtext="DETAILS" hidetext="HIDE DETAILS" shownDefault={false}>
          <span className='urlbox'>URL: {props.url}</span>
          <span className='likesbox'>
            Likes: {props.likes}
            {
            props.token !== null &&
            <button
              className='likebutton'
              title="Like blog Button"
              type="button"
              onClick={async () => await handleLikeIncrement()}
            >LIKE</button>
            }
            {
            (props.author.username === props.user?.username) && props.token !== null
              ? <button
              onClick={async () => await handleRemove()}
              title="Remove blog button"
              type="button"
            >REMOVE</button>
              : <></>
            }
          </span>
        </Toggle>
      </div>
      <hr></hr>
    </>
  )
}

export default Blog
