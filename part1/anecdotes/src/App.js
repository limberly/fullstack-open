import {useState} from 'react';

const Heading = ({text}) => {
  return (
    <h2>
      {text}
    </h2>
  );
};

const DisplayVotes = ({votes, selected}) => {
  return (
    <div>has {votes[selected]} votes</div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  let anecLength = anecdotes.length;
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecLength).fill(0));
  

  const randQuote = () => {
    setSelected(Math.floor(Math.random() * anecLength));
  };

  const vote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const mostVotes = () => {
    console.log(votes);
    return votes.indexOf(Math.max(...votes));
  };
  
  return (
    <div>
      <Heading text='Anecdotes of the day'/>
      {anecdotes[selected]}
      <DisplayVotes votes={votes} selected={selected}/>
      <div>
        <button onClick={vote}>vote</button>
        <button onClick={randQuote}>next anecdote</button>
      </div>

      <Heading text='Anecdote with most votes'/>
      {anecdotes[mostVotes()]}
      <DisplayVotes votes={votes} selected={mostVotes()}/>
    </div>
  );
}

export default App;
