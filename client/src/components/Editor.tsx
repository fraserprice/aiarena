import * as React from 'react';
import * as Request from 'request';
import MyCodeMirror from './MyCodemirror';
import Button from './Button';
import Chessdiagram from 'react-chessdiagram';

const lightSquareColor = '#2492FF'; // light blue
const darkSquareColor = '#005EBB'; // dark blue
const currentPosition =  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // starting position
const flip = false;
const squareSize = 30;

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
  };

  getRes = () => {
    return this.state.res;
  };

  codeOnChange = (newCode: string) => {
    this.setState({
      code: newCode,
    });
  };

  uploadCode = () => {
    const code = this.state.code;
    const url = 'http://127.0.0.1:80/python';
    Request.post(url, { json: { payload: code } }, (err: any, res: Request.RequestResponse, body: any) => {
      if (err) {
        console.log(err.toString());
      } else {
        this.setState({res: JSON.parse(JSON.stringify(body)).payload});
      }
    });
  };

  onMovePiece = (piece: any, fromSquare: any, toSquare: any) => {
    let message = 'You moved ' + piece + fromSquare + ' to ' + toSquare + ' ! It does not stay there.';
    alert(message);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1">
            <div className="cm">
              <MyCodeMirror codeOnChange={this.codeOnChange} />
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
              <Button uploadCode={this.uploadCode} />
            </div>
          </div>
          <div className="col-md-5 col-md-offset-1">
            <div className="save-button">
              <Chessdiagram flip={flip} fen={currentPosition} squareSize={squareSize}
              lightSquareColor={lightSquareColor} darkSquareColor={darkSquareColor} onMovePiece={this.onMovePiece}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
