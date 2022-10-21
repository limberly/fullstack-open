const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.content}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part content = {props.first}/>
      <Part content = {props.second}/>
      <Part content = {props.third}/>
    </>

  )
}

const Total = (props) => {
  return (
    <p>
      Total number of exercises {props.first + props.second + props.third}
    </p>
    
    )
}

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
      <Header header={course} />
      <Content first={part1 + " " + exercises1}
                second={part2 + " " +exercises2} 
                third={part3 + " " +exercises3} />
      <Total first= {exercises1} second={exercises2} third={exercises3} />
    </div>
  )
}

export default App;
