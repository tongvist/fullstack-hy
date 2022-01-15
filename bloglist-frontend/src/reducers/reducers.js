const initialState = {
  info: {
    text: null,
    infoType: null
  }
};

export const setInfoAction = (text, infoType) => {
  return {
    type: 'SET_INFO',
    text,
    infoType
  };
};

export const resetInfoAction = () => {
  return {
    type: 'RESET_INFO'
  };
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_INFO':
    return { ...state, info: { text: action.text, infoType: action.infoType } };
  case 'RESET_INFO':
    return { ...state, info: { text: null, type: null } };
  default:
    return state;
  }
};

export default infoReducer;