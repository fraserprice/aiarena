import React, { Component } from 'react';
import logo from '../res/logo.svg';
import MyButton from './Button';
import MyCodemirror from './MyCodemirror';
import '../css/App.css';
import Editor from "./Editor";

class App extends Component {
  render() {
    return (
      <div className="app row container-fluid">
        <Editor/>
      </div>
    );
  }
}

export default App;
