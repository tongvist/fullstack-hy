export const setNotification = (text, clearDelay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      text
    });
    
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      });
    }, clearDelay * 1000)
  };
};

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return `${action.text}`;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  };
};

export default notificationReducer;