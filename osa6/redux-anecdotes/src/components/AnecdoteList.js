import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { clearNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter);
  
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes)
      .filter(a => {
        return a.content.toLowerCase()
          .includes(filter.toLowerCase())
      })
  );

  const dispatch = useDispatch()

  const voteAnecdote = (id, content, votes) => {
    dispatch(vote(id, content, votes));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;