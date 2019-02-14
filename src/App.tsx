import * as React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          <ul>
          <li><Link to="/">Home</Link></li>
            <li><Link to="/hello">Hello</Link></li>
          </ul>
      </div>
    );
  }
}

export default App;
