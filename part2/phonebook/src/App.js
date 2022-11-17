import {useEffect, useState} from 'react'

import ShowPersons from './components/ShowPersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then(res => setPersons(res))
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
    return persons.filter((person) => person.name === name);
    
  };

  const addName = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const number = newNumber.trim();
    const duplicate = checkDuplicate(name);

    if (duplicate.length) {
      if (window.confirm(`${name} already exists in the phone book. replace the old number with new one?`)) {
        const changedPerson = {...duplicate[0], number: number};
        personService.update(changedPerson.id, changedPerson).then((res) => {
          setPersons(persons.map(person => {
            return person.id !== res.id ? person : res;
          }))
          setNewName('');
          setNewNumber('');
        })
      }
      

    } else if (name === '') {
      alert('No name!');
      setNewName('');
    } else {
      const personObject = {name: name, number: number};
      personService.addPerson(personObject)
        .then(res => {
          setPersons(persons.concat(res));
          setNewName('');
          setNewNumber('');          
        })
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
      <ShowPersons persons={filterPersons()} personsState={persons} setPersons={setPersons}/>
    </div>
  )
};

export default App;
