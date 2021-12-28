export const createChangeAction = (filter) => {
  return {
    type: 'CHANGE',
    filter
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.filter;
    default:
      return state;
  };
};

export default filterReducer;