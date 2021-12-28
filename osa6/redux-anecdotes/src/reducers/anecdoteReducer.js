const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (id, content) => {
  return {
    type: 'VOTE',
    id,
    content
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    content,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(a => a.id !== action.id ? a : { ...a, votes: a.votes + 1 });
    case 'NEW_ANECDOTE':
      return state.concat(asObject(action.content))
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state
  }
}

export default anecdoteReducer;