import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonList from './components/PersonList';
import AddNew from './components/AddNew';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFilter ] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      });
  }, []);

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
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handleChange={handleFilter} value={nameFilter}/>

      <h2>Add new</h2>

      <AddNew 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <PersonList persons={persons} filter={nameFilter}/>
      
    </div>
  )

}

export default App;
