import React, { Component } from 'react';
import MyCodeMirror from './MyCodemirror';
import Button from './Button';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      res: 'Result',
    };
  }

  getRes() {
    return this.state.res;
  }

  codeOnChange(newCode) {
    this.setState({
      code: newCode,
    });
  }

  uploadCode() {
    const code = this.state.code;
    const request = require('request');
    const url = 'http://localhost:3001/python';
    const result = '';
    request.post(url, { json: { payload: code } }, (err, res, body) => {
      if (err) {
        console.log(err.toString());
      } else {
        // console.log(res);
        // this.setState({res: JSON.parse(res.toString())});
      }
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1">
            <div className="cm">
              <MyCodeMirror codeOnChange={this.codeOnChange.bind(this)} />
            </div>
          </div>
          <div className="col-md-4 col-md-offset-1">
            <div className="cm">
              <textarea className="output" readOnly disabled="yes" value={this.state.res} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1">
            <div className="save-button">
              <Button uploadCode={this.uploadCode.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
