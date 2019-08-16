import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import { photos } from "./photos";
// import ReactFileReader from 'react-file-reader';
import {MainList} from './page.js';

function App(props){
  return(
    <div>
      
      <MainList/>
    </div>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
