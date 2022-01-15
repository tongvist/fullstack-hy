import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  info: reducers.infoReducer,
  blogs: reducers.blogReducer
});

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'));