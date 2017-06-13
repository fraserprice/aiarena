import * as React from 'react';
import '../css/profile.scss';
import Auth from "../modules/Auth";
import { Redirect, NavLink } from 'react-router-dom';
import Config from '../config';

const config = Config();
const PROFILE_URL = config.hostname + '/profile';

interface UserProfileProps {}

interface UserProfileData {
  redirectToEditor: boolean;
  loaded: boolean;
  username: string;
  email: string;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileData> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      redirectToEditor: false,
      loaded: false,
      username: "loading...",
      email: ""
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
                  <div className="col-sm-3">
                    <button type="button" className="play-link" onClick={this.play}>
                      <div className="gamecode-pane chess-pane">
                        <h4>first.py</h4>
                        <p>Modified 2 hours ago</p>
                      </div>
                    </button>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane chess-pane">
                      <h4>iterative.py</h4>
                      <p>Modified 4 days ago</p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane chess-pane">
                      <h4>newAlgo.py</h4>
                      <p>Modified 1 week ago</p>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane add-code">
                      <i className="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
                    </div>
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
        this.getUserDetails((userDetails: any) => {
          this.setState({
            loaded: true,
            username: JSON.parse(userDetails).username,
            email: JSON.parse(userDetails).email
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

  getUserDetails = (callback) => {
    fetch(PROFILE_URL, {
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
    }).catch((err) => {
      console.log(err);
    });
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
