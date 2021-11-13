import React from "react";

const Header = ({courseName}) => {  
    return (
      <h2>{courseName}</h2>
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

export default Course;