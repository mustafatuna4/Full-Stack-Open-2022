import React from 'react'
import ReactDOM from 'react-dom/client'

const Header = (props) => {return <><h1>{props.course}</h1></>}
const Part = (props) => {return <><p>
  {props.partNo} {props.exercisesCount}
</p></>}

const Content = (props) => {return <div>
      <Part partNo = {props.part[0].name} exercisesCount= {props.part[0].exercises}/>
      <Part partNo = {props.part[1].name} exercisesCount= {props.part[1].exercises}/>
      <Part partNo = {props.part[2].name} exercisesCount= {props.part[2].exercises}/>
    </div>}

const Total = (props) => {return <><p>Number of exercises {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises}</p></>}

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
      <Header course={course.name} />
      <Content part = {course.parts}/>
      <Total part={course.parts} />
    </div>
  )
}

export default App