import React, { Component } from 'react';
import logo from '../res/logo.svg';
import MyButton from './Button';
import MyCodemirror from './MyCodemirror';
import '../css/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="Centered">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MyButton />
        </div>
        <MyCodemirror />
      </div>
    );
  }
}

export default App;
