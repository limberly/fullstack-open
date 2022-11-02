const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  let sum = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <p><b>total of exercises {sum}</b></p>
  );
  
};

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (<Part key={part.id} part={part}/>))}
    </>
  );
}


const Course = ({course}) => {
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  );
};

export default Course