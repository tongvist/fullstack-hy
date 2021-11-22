import React, { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonList from './components/PersonList';
import AddNew from './components/AddNew';
import phonebook from './services/phonebook';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFilter ] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState('');
  const [ success, setSuccess ] = useState(null);

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
          showNotification(true, `Updated contact ${updatedPerson.name}`);
          setNewName('');
          setNewNumber('');
          e.target.reset();
        })
        .catch(error => {
          showNotification(false, 'Missing number.');
          setNewNumber('');
        });

        return; 
    };

    const newPerson = {
      name: newName, 
      number: newNumber
    }

    phonebook
      .add(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        showNotification(true, `Added new contact: ${createdPerson.name}`);
        setNewName('');
        setNewNumber('');
        e.target.reset();
      })
      .catch(error => {
        showNotification(false, `Missing name or number for new contact.`);
      });
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
        showNotification(true, `Removed contact: ${personToDelete.name}`);
      })
      .catch(error => {
        console.log(error);
        showNotification(true, `Contact ${personToDelete.name} was already removed from database, updating list...`);
        setPersons(persons.filter(person => person.id !== personToDelete.id));
      });
  }

  const showNotification = (actionSuccessful, message) => {
    setSuccess(actionSuccessful);
    setNotificationMessage(message);
    setTimeout(() => {
      setSuccess(null);
      setNotificationMessage('');
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notificationMessage} success={success}/>

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
