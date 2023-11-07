
import React, { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (setState) => () => setState(prev => prev + 1)
  
  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Button label='GOOD' handler={handleClick(setGood)}></Button>
        <Button label='NEUTRAL' handler={handleClick(setNeutral)}></Button>
        <Button label='BAD' handler={handleClick(setBad)}></Button>
      </div>
      <div>
      {       
        good !== 0 || neutral !== 0 || bad !== 0 ? 
        <Stats {...{good, neutral, bad}}></Stats> : 
        <p>No feedback given</p>
      }
      </div>
    </>
  )
}

const Button = ({ label, handler }) => (
  <button onClick={ handler }>
    { label }
  </button>
)

const Stats = ({ good, neutral, bad }) => (
  <table style={{ width: '300px', padding: '10px' }}>
    <caption>
      <h3 style={{ margin: '10px 0 0 0', textAlign: 'left', paddingLeft: '10px' }}>Stats</h3>
    </caption>
    <tbody>
      <StaticLine 
        label='Good: ' 
        value={ good }
      ></StaticLine>
      <StaticLine 
        label='Neutral: ' 
        value={ neutral }
      ></StaticLine>
      <StaticLine 
        label='Bad: ' 
        value={ bad }
      ></StaticLine>
      <StaticLine 
        label='All: ' 
        value={ good + neutral + bad }
      ></StaticLine>
      <StaticLine 
        label='Average: ' 
        value={ ((good + (bad * -1) ) / (good + neutral + bad)).toFixed(1) }
      ></StaticLine>
      <StaticLine 
        label='Positive: ' 
        value={ ((good / (good + neutral + bad)) * 100).toFixed(1) }
        suffix={' %'}
      ></StaticLine>
    </tbody>
    
  </table>
)

const StaticLine = ({ label, value, suffix }) => <tr><td>{label}</td><td>{value + `${suffix ?? ''}`}</td></tr>

export default App;
