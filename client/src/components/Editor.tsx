import * as React from 'react';
import MyCodeMirror from './MyCodemirror';
import Button from './Button';
import Chessdiagram from 'react-chessdiagram';
import * as chessJs from 'chess.js'
import * as io from 'socket.io-client';
import '../css/index.css';
import Auth from "../modules/Auth";

const lightSquareColor = '#2492FF'; // light blue
const darkSquareColor = '#005EBB'; // dark blue
//const currentPosition =  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // starting position
const flip = false;
const squareSize = 30;
const url = 'http://localhost:3000/python';
//const url = 'https://ai-fights.herokuapp.com/python';

interface EditorState {
  code: string;
  res: string;
  chess: any;
  socket: any;
}

class Editor extends React.Component<{}, EditorState> {
  constructor() {
    super();
    var gc = new chessJs();
    this.state = {
      code: '',
      res: 'Result',
      chess: gc,
      socket: io(),
    };

    this.state.socket.on("msg", this.resOnReceive);
  };

  getRes = () => {
    return this.state.res;
  };

  codeOnChange = (newCode: string) => {
    this.setState({
      code: newCode
    });
  };

  resOnReceive = (msg: string) => {
    this.onMovePiece(null, null, msg);
  };

  uploadCode = () => {
    const code = this.state.code;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
      },
      body: JSON.stringify({ payload: code, clientID: 'id' /*TODO: this.state.socket.id returning null*/ })
    }).then((response: any) => {
      return response.json();
    }).then((responseJson: any) => {
      console.log("Code uploaded");
    }).catch((err) => {
      console.log(err.toString());
      this.setState({res: "Error occured while executing command"});
    });
  };

  onMovePiece = (piece: any, fromSquare: any, toSquare: any) => {
    this.state.chess.move(fromSquare+toSquare, {sloppy: true});
    this.setState({res: "You have moved to " + toSquare});
    if (this.state.chess.game_over()) {
      this.setState({res: "Game over"});
    }
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
            <div className="chess">
              <Chessdiagram flip={flip} fen={this.state.chess.fen()} squareSize={squareSize}
              lightSquareColor={lightSquareColor} darkSquareColor={darkSquareColor} onMovePiece={this.onMovePiece}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1">
            <div className="save-button">
              <Button onClick={this.uploadCode}>Upload Code</Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="save-button">
              <textarea className="output" readOnly disabled={true} value={this.state.res} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
