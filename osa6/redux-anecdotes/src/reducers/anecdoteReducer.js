import anecdoteService from '../services/anecdotes';

export const vote = (id, content) => {
  return {
    type: 'VOTE',
    id,
    content
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(a => a.id !== action.id ? a : { ...a, votes: a.votes + 1 });
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  };
};

export default anecdoteReducer;