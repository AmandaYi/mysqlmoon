import React, { Component } from 'react';
import MoonLogo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={MoonLogo} className="App-logo" alt="logo" />
          <p>  Hello Moon Client ! </p>
          <p> 欢迎大家Join US dev Moon </p>
        </header>
      </div>
    );
  }
}

export default App;
