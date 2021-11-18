import React from "react";

const Person = ({id, name, number, handleDelete}) => {
    return (
      <p>{name} {number} <button onClick={() => handleDelete(id)}>delete</button></p>
    )
}
  
const PersonList = ({persons, filter, handleDelete}) => {
    const list = persons.map(person => {
        return <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>
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
