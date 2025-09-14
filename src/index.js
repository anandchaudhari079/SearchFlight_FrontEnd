import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchFLlight from './components/SearchFlight';
import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchFLlight></SearchFLlight>
  </React.StrictMode>
);
