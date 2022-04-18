import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Assets/Scripts/Game';
import { InitStorage } from './Assets/Scripts/Storage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <InitStorage/>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
