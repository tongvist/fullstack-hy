import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import infoReducer from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(infoReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'));