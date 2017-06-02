import React, { Component } from 'react';
import MyCodeMirror from './MyCodemirror';
import Button from './Button';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
    }
  }

  codeOnChange(newCode) {
    this.setState({
      code : newCode
    })
  }

  getCode() {
    return this.state.code;
  }

  render() {
    return (
      <div>
        <div className="cm">
          <MyCodeMirror codeOnChange={this.codeOnChange.bind(this)}/>
        </div>
          <Button getCode={this.getCode.bind(this)}/>
        </div>
    )
  }
}

export default Editor;
