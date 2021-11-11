import React from "react";

const Header = (props) => {  
  return (
    <h1>{props.courseName}</h1>
  );
}

const Part = (props) => {
  return (
    <p>{props.partName} {props.exercises}</p>
  )
}

const Content = (props) => {
  const partsToRender = [];

  for (let i = 0; i < props.parts.length; i += 2) {
    const newPart = <Part partName={props.parts[i]} exercises={props.parts[i + 1]}/>
    partsToRender.push(newPart)
  }
  
  return (
    <div>
      {partsToRender}
    </div>
  );
}

const Total = (props) => {
  const totalExcercises = props.exercises.reduce((prev, next) => {
    return prev + next
  });

  return (
    <p>Number of excercises {totalExcercises}</p>
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
      <Header courseName={course}/>
      <Content parts={[part1, exercises1, part2, exercises2, part3, exercises3]}/>
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
}

export default App;
