import React from "react";

const Person = ({name, number}) => {
    return (
      <p>{name} {number}</p>
    )
}
  
const PersonList = ({persons, filter}) => {
    const list = persons.map(person => {
        return <Person key={person.name} name={person.name} number={person.number}/>
    });

    return filter === '' ? 
        list : 
        list.filter(p => {
        return p.props.name
        .toLowerCase()
        .includes(filter.toLowerCase());
        });
}

export default PersonList
