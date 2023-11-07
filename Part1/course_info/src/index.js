import React from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import './index.css'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={ course.name }></Header>
      <Content data={ course.parts }></Content>
      <Total data={ course.parts }/>
    </div>
  )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
)
