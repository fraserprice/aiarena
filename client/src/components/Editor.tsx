import * as React from 'react';
import * as Request from 'request';
import MyCodeMirror from './MyCodemirror';
import Button from './Button';

interface EditorState {
  code: string;
  res: string;
}

class Editor extends React.Component<{}, EditorState> {
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

  codeOnChange(newCode: string) {
    this.setState({
      code: newCode,
    });
  }

  uploadCode() {
    const code = this.state.code;
    const url = 'http://localhost:3001/python';
    Request.post(url, { json: { payload: code } }, (err: any, res: Request.RequestResponse, body: any) => {
      if (err) {
        console.log(err.toString());
      } else {
        this.setState({res: JSON.parse(JSON.stringify(body)).payload});
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
              <textarea className="output" readOnly disabled={true} value={this.state.res} />
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
