import React, { Component } from 'react';
import logo from '../res/logo.svg';
import MyButton from './Button';
import MyCodemirror from './MyCodemirror';
import '../css/App.css';
import Editor from "./Editor";

class App extends Component {
  render() {
    return (
      <div className="app row">
        <div className="col-md-6 col-md-offset-3">
          <Editor/>
        </div>
      </div>
    );
  }
}

export default App;
