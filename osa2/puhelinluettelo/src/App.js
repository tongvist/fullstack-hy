import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonList from './components/PersonList';
import AddNew from './components/AddNew';
import phonebook from './services/phonebook';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFilter ] = useState('');

  useEffect(() => {
    phonebook
      .getAll()
      .then(contacts => {
        setPersons(contacts);
      })
      .catch(error => console.log(error));
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
      const confirm = window.confirm(`Update number for ${found.name}?`);

      if (!confirm) {
        return;
      }

      phonebook.update({...found, number: newNumber})
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
          setNewName('');
          setNewNumber('');
          e.target.reset();
        });
      return; 
    }

    const newPerson = {
      name: newName, 
      number: newNumber
    }

    phonebook
      .add(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNewName('');
        setNewNumber('');
        e.target.reset();
      })
      .catch(error => console.log(error));
  }

  const handleFilter = (e) => {
    setNameFilter(e.target.value);
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    const confirm = window.confirm(`Delete ${personToDelete.name}?`);

    if (!confirm) {
      return;
    }

    phonebook.remove(id)
      .then(id => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => console.log(error));
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
      
      <PersonList persons={persons} filter={nameFilter} handleDelete={handleDelete}/>
      
    </div>
  )

}

export default App;
