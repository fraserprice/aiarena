import * as React from 'react';
import '../css/profile.scss';
import '../css/profile.scss';
import Auth from "../modules/Auth";
import { Redirect, NavLink } from 'react-router-dom';
import Config from '../config';

const config = Config();
const HOST_URL = config.hostname;

interface UserProfileProps {
  match: any
}

interface UserProfileData {
  redirectToEditor: boolean;
  loaded: boolean;
  username: string;
  email: string;
  submissions: any;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileData> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      redirectToEditor: false,
      loaded: false,
      username: props.match.params.username,
      email: "",
      submissions: []
    };
  }

  unauthorizedLogin() {
    return ([
      <p id="unauthorized">Please log in or register to visit your profile page</p>,
    ]);
  };

  play = () => {
    this.setState({
      redirectToEditor: true
    });
  }

  addGame = () => {
    const game = { name: "GAME", type: "Chess" };
    fetch(HOST_URL + '/game/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          body: JSON.stringify(game)
    }).then((response: any) => {
      if (response.status === 200) {
        var sub = this.state.submissions;
        sub.push(game);
        console.log(sub);
        this.setState({
          submissions: sub
        });
      } else {
        alert("Error adding new game");
      }
    });
  }

  authorizedLogin = () => {
    return (
      <div className="container" id="profile-page">
        <div className="row">
          <div className="col-md-3">
            <div className="row">
                <div className="col-md-4 profile-pic">
                </div>
                  <div className="custom-pane profile-pane col-md-8">
                    <p className="profile-name">{this.state.username}</p>
                    <p><a href="/settings">Settings</a></p>
                    <p><NavLink to="/logout">Log Out</NavLink></p>
                  </div>
            </div>
            <div className="row">
              <div className="divide-pane custom-pane friends-pane">
                <h3>Friends</h3>
                <div className="row">
                  <div className="col-sm-5">
                    <p>Zaniel Dvara</p>
                  </div>
                  <div className="col-sm-5">
                    <a href="/challenge">Challenge</a>
                  </div>
                  <div className="col-sm-2">
                    <div className="online-dot" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <p>Keter Povary</p>
                  </div>
                  <div className="col-sm-5">
                    <a href="/challenge">Challenge</a>
                  </div>
                  <div className="col-sm-2">
                    <div className="offline-dot" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <p>Someone Else</p>
                  </div>
                  <div className="col-sm-5">
                    <a href="/challenge">Challenge</a>
                  </div>
                  <div className="col-sm-2">
                    <div className="offline-dot" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="row friends-search">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search for friends"></input>
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divide-pane custom-pane stats-pane">
                <h3>Statistics</h3>
                <p>Games played : 12</p>
                <p>Games won : 8</p>
                <p>Total game time : 4m20s</p>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="custom-pane games-pane">
              <div>
                <div className="row">
                  <div className="col-sm-12">
                    <h3>Chess</h3>
                  </div>
                </div>
                <div className="row">
                  {this.renderGames()}
                  <div className="col-sm-3">
                    <button type="button" className="play-link" onClick={this.addGame}>
                      <div className="gamecode-pane add-code">
                        <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="top-game-margin">
                <div className="row">
                  <div className="col-sm-12">
                    <h3>Pawn Race</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="gamecode-pane pawn-pane">
                      <h4>pawn.py</h4>
                      <p>Modified 12 hours ago</p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane pawn-pane">
                      <h4>pawn2.py</h4>
                      <p>Modified 6 days ago</p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane pawn-pane">
                      <h4>pawn3.py</h4>
                      <p>Modified 5 weeks ago</p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane add-code">
                      <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

  authorizedFailedToGetDetails() {
    return(<p>Failed to fetch user details. Please try again.</p>)
  };

  loginScreen = () => {
    if(Auth.isUserAuthenticated()) {
      if (!this.state.loaded) {
        this.getUserState((user: any) => {
          console.log(user);
          this.setState({
            loaded: true,
            //email: JSON.parse(user).email,
            submissions: JSON.parse(JSON.stringify(user)).submissions
          });
        });
        return this.authorizedLogin();
      } else {
        return this.authorizedLogin();
      }
    } else {
      return this.unauthorizedLogin();
    }
  };

  getUserState = (callback: (user: any) => void) => {
    fetch(HOST_URL + "/user/" + this.state.username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
      }
    }).then((response: any) => {
      return response.json();
    }).then((responseJson: any) => {
      callback(responseJson);
    });
  };

  renderGames = () => {
    const submissions = this.state.submissions;
    var submissionHolders:any[];
    submissionHolders = [];
    for (var i = 0; i < submissions.length; i++) {
      submissionHolders.push(
                   <div className="col-sm-3">
                     <button type="button" className="play-link" onClick={this.play}>
                       <div className="gamecode-pane chess-pane">
                         <h4>{submissions[i].name}</h4>
                         <p>Modified 2 hours ago</p>
                       </div>
                     </button>
                   </div>
      );
    }

    return (
      <div>
        {submissionHolders}
      </div>
    );
  };

  render() {
    if (this.state.redirectToEditor) {
      return (
        <Redirect to={{pathname: '/editor'}}/>
      );
    }

    return (
      <div>
        {this.loginScreen()}
      </div>
    );
  }
}

export default UserProfile;
