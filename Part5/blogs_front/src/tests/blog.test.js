import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Note from './Note'
import Blog from '../components/Blog.tsx'

test('renders content', () => {
  const blog = {
    id: 'aass1233',
    title: 'sometitle',
    url: 'http://www.google.com.ar',
    likes: 123,
    author: {
      username: 'someusername'
    }

  }

  const component = render(
    <Blog {...{blog}}></Blog>
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})