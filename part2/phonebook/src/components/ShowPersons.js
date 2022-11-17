import personService from '../services/persons'

const deletePerson = (id, personsState, setPersons) => {
    
    if (window.confirm('Delete this person from the phonebook?')) {
        
        personService.deletePerson(id)
            .then(res => {
                setPersons(personsState.filter(person => person.id !== id));
            })
            .catch(error => console.log('already deleted'));
    }
};

const ShowPersons = ({persons, personsState, setPersons}) => {
    return (
        <ul>
            {persons.map((person) => <li key={person.id}>
                {person.name}: {person.number}
                <button onClick={() => deletePerson(person.id, personsState, setPersons)}>delete</button>
                </li>)}
            
        </ul>
        
    );
};

export default ShowPersons