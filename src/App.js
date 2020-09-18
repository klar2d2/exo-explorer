import React from 'react';
import './sass/style.scss'
import Content from './Components/Content'
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return(
    <Router>
      <div className="App" >
        <Content />
      </div>
    </Router>
  )
}
