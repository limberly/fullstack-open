import personService from '../services/persons'

const deletePerson = (name, id, personsState, setPersons, setError) => {
    
    if (window.confirm('Delete this person from the phonebook?')) {
        
        personService.deletePerson(id)
            .then(res => {
                setPersons(personsState.filter(person => person.id !== id));
            })
            .catch(error => {
                setError(`${name} already deleted from database`)
                setPersons(personsState.filter(p => p.id !== id));
                setTimeout(() => {
                    setError(null)
                }, 2000);
            });
    }
};

const ShowPersons = ({persons, personsState, setPersons, setError}) => {
    return (
        <ul>
            {persons.map((person) => <li key={person.id}>
                {person.name}: {person.number}
                <button onClick={() => deletePerson(person.name, person.id, personsState, setPersons, setError)}>delete</button>
                </li>)}
            
        </ul>
        
    );
};

export default ShowPersons