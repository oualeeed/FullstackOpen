import { useState } from 'react'

const Button = ({text ,handler}) =>  <button onClick={handler}>{text}</button>
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  return (
    <>
      <h1>Give feedback</h1>
      <Button text='good' handler={() => setGood(good + 1)}/>
      <Button text='neutral' handler={() => setNeutral(neutral + 1)}/>   
      <Button text='bad' handler={() => setBad(bad + 1)}/>
      <h2>Statistics</h2>     
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )
}

export default App;
