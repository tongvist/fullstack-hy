const initialState = 'Notification';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return `You voted for ${action.text}`;
    default:
      return initialState;
  }
}

export default notificationReducer;