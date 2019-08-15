import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import { photos } from "./photos";
// import ReactFileReader from 'react-file-reader';
import {MainList} from './fetch.js';
// import {Gallerybundle} from './gallery.js'
// import Files from 'react-files'

// const photos = [
//   {
//     src: 'http://localhost:8888/test/1.jpg',
//     width: 3,
//     height: 4
//   },
//   {
//     src: 'http://localhost:8888/test/2.jpg',
//     width: 3,
//     height: 4
//   },
//   {
//     src: 'http://localhost:8888/test/3.jpg',
//     width: 3,
//     height: 4
//   },
//   {
//     src: 'http://localhost:8888/test/4.jpg',
//     width: 3,
//     height: 4
//   },
//   {
//     src: 'http://localhost:8888/test/5.jpg',
//     width: 3,
//     height: 4
//   },
//   {
//     src: 'http://localhost:8888/test/6.jpg',
//     width: 3,
//     height: 4
//   },
// ];



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
