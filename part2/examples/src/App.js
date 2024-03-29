import { useEffect, useState } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const Notification = ({message}) => {
  if (message === null) {
    return null;
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
};

function App() {


  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error');

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
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

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('');
      })
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note ${note.content} was already removed`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })


  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <button onClick={notesFilter}>show {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(
          note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
}

export default App;
