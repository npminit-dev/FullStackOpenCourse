import '../App.css'
import type { BlogProps } from '../types/types'
import Toggle from './Toggle'
import { like_Blog, remove_Blog } from '../utils/userRequests'
import React from 'react'

const Blog = (props: BlogProps): React.ReactNode => {
  const handleLikeIncrement = async (): Promise<any> => {
    const result = await like_Blog(props.token ?? '', props.id, props.likes + 1)
    if (result instanceof Error) {
      props.setmsg !== undefined && props.setmsg(
        { msg: `Error: ${result.message}`, type: 'info' })
    } else {
      props.setblogs !== undefined && props.setblogs(blogs => blogs.map(blog => {
        if (props.id === blog.id) {
          const incrLikeBlog: BlogProps = { ...blog, likes: props.likes + 1 }
          return incrLikeBlog
        } else return blog
      }))
    }
  }

  const handleRemove = async (): Promise<any> => {
    const confirm = globalThis.confirm('Confirm blog removal?')
    if (confirm) {
      const result = await remove_Blog(props.token ?? '', props.id)
      if (result instanceof Error) {
        props.setmsg !== undefined && props.setmsg(
          { msg: `Error: ${result.message}`, type: 'info' })
      } else {
        props.setblogs !== undefined && props.setblogs(blogs => blogs.filter(blog => blog.id !== props.id))
      }
    }
  }

  return (
    <>
      <div className="blogbox">
        <span>Author: {props.author.username}</span>
        <span>Title: {props.title}</span>
        <Toggle showtext="DETAILS" hidetext="HIDE DETAILS" shownDefault={false}>
          <span>URL: {props.url}</span>
          <span>
            Likes: {props.likes}
            {
            props.token !== null &&
            <button
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
