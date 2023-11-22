/**
 * @jest-environment jsdom
 */

import type { BlogProps } from '../src/types/types'
import React from 'react'
import 'react-dom'
import '@testing-library/jest-dom'
import { RenderResult, fireEvent, render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import { prettyDOM } from '@testing-library/react'
import PostBlog from '../src/components/PostBlog'
import { PostBlogProps } from '../src/types/types'

let blogProps: BlogProps;
let postBlogProps: PostBlogProps
let blogComponent: RenderResult;
let postBlogComponent: RenderResult;

beforeEach(() => {
  blogProps = {
    id: '123123',
    title: 'sometitle',
    url: 'http://www.google.com.ar',
    likes: 222,
    author: {
      username: 'someusername'
    }
  }

  postBlogProps = {
    user: {
      name: 'somename',
      username: 'someusername'
    },
    token: 'asd12ehdh913dwfsdf__',
    setblogs: () => 1,
    setmsg: () => 3
  }

  blogComponent = render( <Blog {...blogProps}></Blog>)
  postBlogComponent = render( <PostBlog {...postBlogProps}></PostBlog> )
})

describe('Blog.tsx test:', () => {
  test('Blog default showed data', () => {
    const authorSpan = blogComponent.container.querySelector('.authorbox')
    const titleSpan = blogComponent.container.querySelector('.titlebox')
    const urlSpan = blogComponent.container.querySelector('.urlbox')
    const likesSpan = blogComponent.container.querySelector('.likesbox')
  
    expect(blogComponent.container).toBeDefined()
    expect(authorSpan).toBeDefined()
    expect(titleSpan).toBeDefined()
    expect(urlSpan).toBeNull()
    expect(likesSpan).toBeNull()
  
    console.log(prettyDOM(authorSpan ?? undefined))
    console.log(prettyDOM(titleSpan ?? undefined))
    console.log(prettyDOM(urlSpan ?? undefined))
    console.log(prettyDOM(likesSpan ?? undefined))
  })

  test('Blog extended data and double click "like" button', async () => {
    const mockFn = jest.fn()
    const showBtn = blogComponent.container.querySelector('.showtextbox')
    showBtn !== null && fireEvent.click(showBtn)
    const likeBtn = blogComponent.container.querySelector('.likebutton')
    likeBtn?.addEventListener('click', mockFn)

    likeBtn !== null && fireEvent.click(likeBtn)
    likeBtn !== null && fireEvent.click(likeBtn)
    
    expect(mockFn.mock.calls).toHaveLength(2)
    expect(showBtn).toBeDefined()
    expect(likeBtn).toHaveTextContent('LIKE')
  })
})

describe('PostBlog.tsx test:', () => {
  test('PostBlog input validation', () => {
    const titleInput = postBlogComponent.container.querySelector('.titleinput')
    const likesInput = postBlogComponent.container.querySelector('.likesinput')
    const urlInput = postBlogComponent.container.querySelector('.urlinput')
    
    titleInput !== null && fireEvent.change(titleInput, { target: { value: 'myblogtitle'} })
    likesInput !== null && fireEvent.change(likesInput, { target: { value: 120} })
    urlInput !== null && fireEvent.change(urlInput, { target: { value: 'http://someurl.com'} })
    
    expect(screen.getByDisplayValue('myblogtitle') === titleInput).toBe(true)
    expect(screen.getByDisplayValue(120) === likesInput).toBe(true)
    expect(screen.getByDisplayValue('http://someurl.com') === urlInput).toBe(true)
  })
})


export {}