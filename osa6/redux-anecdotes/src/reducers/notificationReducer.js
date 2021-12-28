const initialState = null;

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return `You voted for '${action.content}'`;
    case 'CLEAR_NOTIFICATION':
      return null;
    case 'NEW_ANECDOTE':
      return `You created '${action.content}'`;
    default:
      return initialState;
  }
}

export default notificationReducer;