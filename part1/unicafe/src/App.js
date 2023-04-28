import { useState } from 'react'

const Button = ({text ,handler}) =>  <button onClick={handler}>{text}</button>


const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>


const Statistics = ({good, neutral , bad , all}) => {
  if (all === 0) return (<p>No feedback given</p>)
  return (
    <>
      <h2>Statistics</h2>
      <table>
      <tbody> 
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={(good - bad)/all} />
      <StatisticLine text='positive' value={(((good )/all)*100) + '%' } />
      </tbody> 
      </table>  
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all , setAll] = useState(0)
  
  const handler = (feedback, setter) => () =>{
    setAll(all + 1)
    setter(feedback+1)
  }
  
  return (
    <>
      <h1>Give feedback</h1>
      <Button text='good' handler={handler(good, setGood)}/>
      <Button text='neutral' handler={ handler(neutral, setNeutral) }/>   
      <Button text='bad' handler={ handler(bad , setBad)}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </>
  )
}

export default App;    