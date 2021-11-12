import React from "react";

const Header = (props) => {  
  return (
    <h1>{props.course.name}</h1>
  );
}

const Part = (props) => {
  return (
    <p>{props.partName} {props.exercises}</p>
  )
}

const Content = (props) => {
  const partsToRender = [];

  for (let i = 0; i < props.course.parts.length; i++) {
    const newPart = <Part partName={props.course.parts[i].name} exercises={props.course.parts[i].exercises}/>
    partsToRender.push(newPart)
  }
  
  return (
    <div>
      {partsToRender}
    </div>
  );
}

const Total = (props) => {
  const totalExcercises = props.course.parts.reduce((prev, next) => {
    return prev.exercises + next.exercises
  });

  return (
    <p>Number of excercises {totalExcercises}</p>
  )
}

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
    }]};

  return (
   <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </div>
  );
}

export default App;
