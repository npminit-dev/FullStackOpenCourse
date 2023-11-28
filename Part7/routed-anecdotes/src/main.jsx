import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AnecdoteList } from './AnecdoteList'
import { CreateNew } from './CreateNew'
import { About } from './About'
import AnecdoteDetails from './AnecdoteDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <AnecdoteList></AnecdoteList>,
        children: [
          {
            path: 'anecdotes/:id',
            element: <AnecdoteDetails></AnecdoteDetails>
          }
        ]
      },
      {
        path: '/create',
        element: <CreateNew></CreateNew>
      },
      {
        path: '/about',
        element: <About></About>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)