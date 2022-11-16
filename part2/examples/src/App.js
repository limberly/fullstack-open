import {useEffect, useState} from 'react';
import Note from './components/Note';
import axios from 'axios';

function App() {


  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      })
  }, []);
  console.log('render', notes.length, 'notes');

  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important === true);

  const notesFilter = () => {
    setShowAll(!showAll);
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    axios.post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response);
        setNotes(notes.concat(response.data))
        setNewNote('');
      })
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    console.log(`Importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((note) => note.id === id);
    const changedNote = {...note, important: !note.important};

    axios.put(url, changedNote).then((res) => {
      setNotes(notes.map((note) => note.id !== id ? note : res.data))
    })

  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={notesFilter}>show {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(
          note => 
            <Note key={note.id} note={note} toggleImportance={()=> toggleImportanceOf(note.id)}/>
        )} 
      </ul>
      <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type='submit'>save</button>
      </form>
    </div>
  );
}

export default App;
