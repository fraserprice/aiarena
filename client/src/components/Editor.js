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
        <div className="row">
          <div className="col-md-5 col-md-offset-1">
            <div className="cm">
              <MyCodeMirror codeOnChange={this.codeOnChange.bind(this)}/>
            </div>
          </div>
          <div className="col-md-4 col-md-offset-1">
            <div className="cm">
              <textarea className="output" readOnly disabled="yes"></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1">
            <div className="save-button">
              <Button getCode={this.getCode.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Editor;
