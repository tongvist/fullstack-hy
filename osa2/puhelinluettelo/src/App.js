import React, { useState } from 'react'
import Filter from './components/Filter';

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const PersonList = ({persons, filter}) => {
  
  const list = persons.map(person => {
    return <Person key={person.name} name={person.name} number={person.number}/>
  });

  return filter === '' ? list : list.filter(p => p.props.name.toLowerCase().includes(filter));

}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '+358 441234567' },
    { name: 'Jim Halpert',
      number: '010 1232344' },
    { name: 'Dwight K. Schrute',
      number: '020 2349878' }
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFilter ] = useState('');
  // const [ displayedPersons, setDisplayedPersons ] = useState([...persons]);

  const handleChange = (e) => {
    const name = e.target.value;
    setNewName(name);
  }

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = persons.find(person => person.name === newName);

    if (found) {
      alert(`${newName} is already in the list`);
      return;
    }

    const person = {
      name: newName, 
      number: newNumber
    }

    setPersons(persons.concat(person));
    setNewName('');
    setNewNumber('');
    e.target.reset();
  }

  const handleFilter = (e) => {

    setNameFilter(e.target.value);
    // setDisplayedPersons(displayedPersons.filter(person => person.name.includes(nameFilter)));
    
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleChange={handleFilter} value={nameFilter}/>

      <h2>Add new </h2>

      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <PersonList persons={persons} filter={nameFilter}/>
      
    </div>
  )

}

export default App;
