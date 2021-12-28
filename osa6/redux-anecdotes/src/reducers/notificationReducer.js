export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE':
      return `You voted for '${action.content}'`;
    case 'CLEAR_NOTIFICATION':
      return '';
    case 'NEW_ANECDOTE':
      return `You created '${action.data.content}'`;
    default:
      return state;
  }
}

export default notificationReducer;