import { useState } from 'react'

const StatisticsLine = (props) => { return <tr><td colSpan={2}>{props.text}</td><td>{props.value}</td></tr> }
// a proper place to define a component
const Statistics = (props) => {
  return <div>
    <table maxwidth={500} height={20} align={'left'} >
      <tbody >
        <StatisticsLine text={"good"} value={props.good}></StatisticsLine>
        <StatisticsLine text={"neutral"} value={props.neutral}></StatisticsLine>
        <StatisticsLine text={"bad"} value={props.bad}></StatisticsLine>
        <StatisticsLine text={"all"} value={props.good + props.neutral + props.bad}></StatisticsLine>
        <StatisticsLine text={"average"} value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}></StatisticsLine>
        <StatisticsLine text={"positive"} value={(props.good) / (props.good + props.neutral + props.bad)}></StatisticsLine>
      </tbody>
    </table>
  </div>
}
const Button = (props) => { return <button onClick={props.func}>{props.text}</button> }
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => (setGood(good + 1))

  const incrementNeutral = () => (setNeutral(neutral + 1))

  const incrementBad = () => (setBad(bad + 1))
  return (
    <div>
      <h1>give feedback</h1>
      <Button func={incrementGood} text={"good"}></Button>

      <Button func={incrementNeutral} text={"neutral"}></Button>

      <Button func={incrementBad} text={"bad"}></Button>
      <br></br>
      <h1>statistics</h1>
      {(good || neutral || bad) ? <Statistics good={good} neutral={neutral} bad={bad}></Statistics> : <p>no statistics given</p>}

    </div>
  )
}

export default App