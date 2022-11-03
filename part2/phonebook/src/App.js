import {useEffect, useState} from 'react'
import axios from 'axios'

import ShowPersons from './components/ShowPersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      setPersons(res.data);
    })
  }, [])


  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  
  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const checkDuplicate = (name) => {
    console.log('duplicate', name);
    return persons.filter((person) => person.name === name);
    
  };

  const addName = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const number = newNumber.trim();

    if (checkDuplicate(name).length) {
      alert(`${name} is already added to the phonebook`);
      setNewName('');
      setNewNumber('');

    } else if (name === '') {
      alert('No name!');
      setNewName('');
    } else {
      setPersons(persons.concat({name: name, number: number}));
      
      setNewName('');
      setNewNumber('');
    }
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const filterPersons = () => {
    const trimFilter = filter.trim().toLowerCase();
    if (trimFilter === '') {
      return persons
    } else {
      return persons.filter(person => person.name.toLowerCase().match(trimFilter));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} changeFilter={changeFilter}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} 
                  changeNewName={changeNewName}
                  newNumber={newNumber}
                  changeNewNumber={changeNewNumber}/>
      <h2>Numbers</h2>
      <ShowPersons persons={filterPersons()}/>
    </div>
  )
};

export default App;
