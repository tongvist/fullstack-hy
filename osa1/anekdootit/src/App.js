import React, {useState} from "react";

const Anecdote = ({headerText, text, votes}) => {
  return (
    <div>
      <h1>{headerText}</h1>
      <p>{text}</p>
      <p>Has {votes} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(7).fill(0));
  const [mostVotes, setMostVotes] = useState(null);

  const changeAnecdote = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(newIndex);
  }

  const vote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;

    if (mostVotes === null || newVotes[selected] > votes[mostVotes]) {
      setMostVotes(selected)
    }

    setVotes(newVotes);
  }

  return (
    <div>
      <Anecdote headerText="Anecdote of the day" text={anecdotes[selected]} votes={votes[selected]}/>
      
      <Button onClick={vote} text="Vote" />
      <Button onClick={changeAnecdote} text="Next Anecdote" />
      
      {mostVotes !== null ? 
      <Anecdote headerText="Anecdote with most votes" text={anecdotes[mostVotes]} votes={votes[mostVotes]} /> 
      : null}
    </div>
  );
}

export default App;
