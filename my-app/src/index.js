import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import { photos } from "./photos";
// import ReactFileReader from 'react-file-reader';
import {MainList} from './page.js';
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
