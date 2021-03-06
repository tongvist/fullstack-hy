const initialStateInfo = {
  text: null,
  infoType: null
};

const initialStateBlogs = [];

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

export const initializeBlogs = (data) => {
  return {
    type: 'INIT_BLOGS',
    data
  };
};

export const addBlogAction = (data) => {
  return {
    type: 'ADD_BLOG',
    data
  };
};

export const updateBlogAction = (data) => {
  return {
    type: 'UPDATE_BLOG',
    data
  };
};

export const deleteBlogAction = (id) => {
  return {
    type: 'DELETE_BLOG',
    id
  };
};

export const updateCommentsAction = (data) => {
  return {
    type: 'UPDATE_COMMENTS',
    data
  };
};

export const setUserAction = (data) => {
  return {
    type: 'SET_USER',
    data
  };
};

const infoReducer = (state = initialStateInfo, action) => {
  switch (action.type) {
  case 'SET_INFO':
    return { text: action.text, infoType: action.infoType };
  case 'RESET_INFO':
    return { text: null, type: null } ;
  default:
    return state;
  }
};

const blogReducer = (state = initialStateBlogs, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data;
  case 'ADD_BLOG':
    return state.concat(action.data);
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data);
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id);
  case 'UPDATE_COMMENTS':
    return state.map(blog => blog.id !== action.data.id ? blog : { ...blog, comments: action.data.comments });
  default:
    return state;
  }
};

export const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data;
  default:
    return state;
  }
};

const reducers = { infoReducer, blogReducer, userReducer };

export default reducers;