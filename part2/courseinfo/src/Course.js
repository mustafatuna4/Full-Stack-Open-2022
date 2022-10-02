const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h4>Total of {sum} exercises</h4>

const Part = ({ part }) => {
  return <p>
    {part.name} {part.exercises}
  </p>
}

const Content = ({ parts }) => {
  const arr = parts.map((x, id) => {
    return <Part key={id} part={x}>
    </Part>
  })
  return <>
    {arr}

  </>
}
const Course = (props) => {
  const total = props.course.parts.reduce(
    function (initialValue, currentValue) {
      return initialValue + currentValue.exercises
    }, 0
  )
  return <><Header course={props.course.name}></Header> <Content parts={props.course.parts}></Content><Total sum={total}></Total> </>
}
export default Course