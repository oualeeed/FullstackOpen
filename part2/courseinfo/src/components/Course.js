const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => <p><b>Total of exercises {parts.reduce( (sum , part) => sum + part.exercises , 0)}</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part} key={part.id}/> )} 
  </>

const Course = ({course}) =>  
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

export default Course