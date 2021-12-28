let timeoutId;

export const setNotification = (text, clearDelay) => {
  if (typeof timeoutId === 'number') {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }
  
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      text
    });
    
    timeoutId = setTimeout(() => {
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