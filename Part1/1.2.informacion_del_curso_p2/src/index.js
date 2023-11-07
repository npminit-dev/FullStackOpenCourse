import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import './index.css'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}></Header>
      <Content data={[
        { name: part1, exercises: exercises1 },
        { name: part2, exercises: exercises2 },
        { name: part3, exercises: exercises3 }
      ]}></Content>
      <Total total={ exercises1 + exercises2 + exercises3 }/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))