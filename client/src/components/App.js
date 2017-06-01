import React, { Component } from 'react';
import logo from '../res/logo.svg';
import MyButton from './Button';
import MyCodemirror from './MyCodemirror';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="app row">
        <div className="cm col-md-6 col-md-offset-3">
          <MyCodemirror />
        </div>
        <div className="save-button col-md-2 col-md-offset-5">
          <MyButton name="Save the code"/>
        </div>
      </div>
    );
  }
}

export default App;
