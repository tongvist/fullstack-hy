import React from "react";

const Header = ({courseName}) => {  
  return (
    <h1>{courseName}</h1>
  );
}

const Part = ({partName, exercises, id}) => {
  return (
    <p>{partName} {exercises}</p>
  );
}

const Content = ({parts}) => {
  const partsToRender = parts.map((part) => {
    return <Part key={part.id} partName={part.name} exercises={part.exercises}/>
  });
  
  return (
    <>
      {partsToRender}
      <Total parts={parts}/>
    </>
  );
}

const Total = ({parts}) => {
  const totalExcercises = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <p><strong>Total of {totalExcercises} exercises</strong></p>
  );
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>      
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
