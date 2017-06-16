import * as React from 'react';
import MyCodeMirror from './MyCodemirror';
import * as ReactBootstrap from 'react-bootstrap';
import Chessdiagram from 'react-chessdiagram';
import * as chessJs from 'chess.js'
import * as io from 'socket.io-client';
import '../css/index.scss';
import Auth from '../modules/Auth';
import Config from '../config';

const lightSquareColor = '#2492FF'; // light blue
const darkSquareColor = '#005EBB'; // dark blue
const flip = false;
const squareSize = 30;
var player = "White";
const config = Config();
const CODE_ADD_URL = config.hostname + '/auth/add/code';
const CODE_GET_URL = config.hostname + '/auth/get/code';

interface EditorState {
  loaded: boolean;
  username: string;
  submissionIndex : string;
  enemyID: string;
  enemyName: string;
  res: string;
  chess: any;
  socket: any;
  code: string;
}

interface EditorProps {
  match: any
}

class Editor extends React.Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);
    var gc = new chessJs();
    this.state = {
      loaded: false,
      username: props.match.params.username,
      submissionIndex: props.match.params.submissionIndex,
      enemyID: props.match.params.enemyID,
      enemyName: props.match.params.enemyName,
      res: 'Game history\n',
      chess: gc,
      socket: io(),
      code: 'def main:\n\t# Start writing here'
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

  getCode = () => this.state.code;

  resOnReceive = (msg: string) => {
    this.onMovePiece(null, null, msg);
  };

  uploadCode = () => {
    const code = this.state.code;
    fetch(CODE_ADD_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
      },
      body: JSON.stringify({ new_code: code, dbID: this.state.submissionIndex })
    }).then((response: any) => {
      if (response.status !== 200) {
        alert("Code upload failed!");
      }
    });
  };

  onMovePiece = (piece: any, fromSquare: any, toSquare: any) => {
    this.state.chess.move(fromSquare+toSquare, {sloppy: true});
    this.setState({res: this.state.res + player + " made a move : " + toSquare + "\n"});
    if (player == "White") {
      player = "Black";
    } else {
      player = "White";
    }
    if (this.state.chess.game_over()) {
      this.setState({res: "Game over"});
    }
  };

  renderCodeMirror = () => {
    if (this.state.loaded) {
      return (
        <MyCodeMirror codeOnChange={this.codeOnChange} getCode={this.getCode} />
      );
    } else {
      return(<div></div>);
    }
  };

  render() {
    if (Auth.isUserAuthenticated) {
      if (!this.state.loaded) {
        console.log("Getting code with dbID: " + this.state.submissionIndex);
        const req = { dbID: this.state.submissionIndex };
        fetch(CODE_GET_URL, {
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + Auth.getToken()
              },
              body: JSON.stringify(req)
        }).then((response: any) => {
          return response.json();
        }).then((response: any) => {
          console.log(JSON.parse(JSON.stringify(response)).raw_code);
          this.setState({
            loaded: true,
            code: JSON.parse(JSON.stringify(response)).raw_code
          });
        });
      }
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-5 col-md-offset-1">
            <div className="cm">
              {this.renderCodeMirror()}
            </div>
            <div className="save-button">
              <ReactBootstrap.Button bsStyle="success" onClick={this.uploadCode}>Play</ReactBootstrap.Button>
              <ReactBootstrap.Button bsStyle="default" onClick={this.uploadCode}>Save</ReactBootstrap.Button>
              <ReactBootstrap.Button bsStyle="danger" onClick={this.uploadCode}>Clear</ReactBootstrap.Button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="row text-center game-name">
                <h3>{this.state.username} vs {this.state.enemyName} </h3>
                <p>00:00</p>
              </div>
              <div className="chess">
                <Chessdiagram flip={flip} fen={this.state.chess.fen()} squareSize={squareSize}
                lightSquareColor={lightSquareColor} darkSquareColor={darkSquareColor} onMovePiece={this.onMovePiece}/>
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
        </div>
      </div>
    );
  }
}

export default Editor;
