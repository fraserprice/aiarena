import * as React from 'react';
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
  submissionToOpen: string;
  loaded: boolean;
  username: string;
  email: string;
  submissions: any;
  friends: any;
  mainSubmission: string;
  friendSearchValue: string;
  challengeUser: boolean;
  enemyID: string;
  enemyName: string;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileData> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      redirectToEditor: false,
      submissionToOpen: "",
      loaded: false,
      username: props.match.params.username,
      email: "",
      submissions: [],
      friends: [],
      mainSubmission: "",
      friendSearchValue: "",
      challengeUser: false,
      enemyID: "",
      enemyName: ""
    };
  }

  unauthorizedLogin() {
    return ([
      <p id="unauthorized">Please log in or register to visit your profile page</p>,
    ]);
  };

  mainSubmissionName = () => {
    const mainID = this.state.mainSubmission;
    if (mainID === "" || mainID === undefined) {
      return "none";
    }

    const submissions = this.state.submissions;
    for (var i = 0; i < submissions.length; i++) {
      if (submissions[i].dbID == mainID) {
        return submissions[i].name;
      }
    }

    return "none";
  }

  play = (submissionIndex: string) => {
    this.setState({
      redirectToEditor: true,
      submissionToOpen: submissionIndex
    });
  }

  updateFriendSearch = (e) => {
    this.setState({
      friendSearchValue: e.target.value
    });
  }

  addFriend = () => {
    const name = this.state.friendSearchValue;
    fetch(HOST_URL + '/auth/friend/add/' + name, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
          }
    }).then((response: any) => {
      if (response.status !== 200) {
        alert("Failed adding friend");
      } else {
        return response.json();
      }
    }).then((response: any) => {
      if (response !== undefined) {
        var friends = this.state.friends;
        console.log(response);
        friends.push(response);
        this.setState({
          friends: friends
        });
      }
    });
  };


  deleteGame = (name: string, dbID: string) => {
    const req = { name: name, dbID: dbID };
    fetch(HOST_URL + '/auth/del/submission', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          body: JSON.stringify(req)
    }).then((response: any) => {
      if (response.status !== 200) {
        alert("Delete game: operation failed");
      } else {
        this.deleteGameLocal(dbID);
      }
    });
  }

  deleteGameLocal = (dbID: string) => {
    var submissions: any = this.state.submissions;
    var index: number = -1;
    for (var i: number = 0; i < submissions.length; i++) {
      if (submissions[i].dbID === dbID) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      submissions.splice(index, 1);
    } else {
      alert("Delete game: unable to delete locally, refresh the page");
    }

    this.setState({
      submissions: submissions
    });
  }

  setMain = (dbID: string) => {
    const req = { dbID: dbID };
    fetch(HOST_URL + '/auth/set/main-submission', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          body: JSON.stringify(req)
    }).then((response: any) => {
      if (response.status !== 200) {
        alert("error setting main submission");
      } else {
        this.setMainLocal(dbID);
      }
    });
  }

  setMainLocal = (dbID: string) => {
    //TODO
  }

  addGame = () => {
    const game = { name: "GAME", type: "Chess", dbID: "" };
    fetch(HOST_URL + '/auth/add/submission', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          body: JSON.stringify(game)
    }).then((response: any) => {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("Error adding new game");
      }
    }).then((response: any) => {
      if (response !== undefined) {
        var sub = this.state.submissions;
        game.dbID = response.dbID;
        sub.push(game);
        console.log(sub);
        this.setState({
          submissions: sub
        });
      }
    });
  }

  renameGame = (dbID: string, name:string) => {
    const req = { new_name: name, dbID: dbID };
    fetch(HOST_URL + '/auth/add/rename', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          body: JSON.stringify(req)
    }).then((response: any) => {
      if (response.status !== 200) {
        alert("Delete game: operation failed");
      } else {
        this.renameGameLocal(dbID, name);
      }
    });
  }

  renameGameLocal = (dbID: string, name:string) => {
    var submissions: any = this.state.submissions;
    var index: number = -1;
    for (var i: number = 0; i < submissions.length; i++) {
      if (submissions[i].dbID === dbID) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      submissions[index].name = name;
    } else {
      alert("Delete game: unable to rename, refresh the page");
    }

    this.setState({
      submissions: submissions
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
                  {this.renderFriends()}
                <div className="row friends-search">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Type a friend's name..." onChange={this.updateFriendSearch}></input>
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.addFriend}><i className="fa fa-plus" aria-hidden="true"></i></button>
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
                <p>Main submission: {this.mainSubmissionName()}</p>
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
                  <div className="col-sm-9 games-container">
                    <div className="row">
                      {this.renderGames()}
                    </div>
                  </div>
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
                      <h4><div id="pawn">pawn.py</div></h4>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane pawn-pane">
                      <h4><div id="pawn">pawn2.py</div></h4>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="gamecode-pane pawn-pane">
                      <h4><div id="pawn">pawn3.py</div></h4>
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
            mainSubmission: JSON.parse(JSON.stringify(user)).mainSubmission,
            submissions: JSON.parse(JSON.stringify(user)).submissions,
            friends: JSON.parse(JSON.stringify(user)).friends
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
    fetch(HOST_URL + "/auth/get/user/" + this.state.username, {
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

  challengeUser = (enemyID: string, enemyName: string) => {
    this.setState({
      enemyID: enemyID,
      enemyName: enemyName,
      challengeUser: true,
      redirectToEditor: true
    });
  };

  renderFriends = () => {
    const friends = this.state.friends;
    var friendHolders: any[];
    friendHolders = [];
    for (var i = 0; i < friends.length; i++) {
      const id = friends[i].uid;
      const name = friends[i].name;
      console.log(name);
      friendHolders.push(
        <div className="row">
          <div className="col-sm-5">
            <p>{name}</p>
          </div>
          <div className="col-sm-5">
            <a onClick={() => this.challengeUser(id, name)}>Challenge</a>
          </div>
          <div className="col-sm-2">
            <div className="online-dot" aria-hidden="true"></div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {friendHolders}
      </div>
    );
  };


  checkExampleSub = (name: string, id: string) => {
    if (name === "Chess ex.") {
      return;
    } else {
      return (
        <div className="col-sm-3 delete-link">
          <a onClick={() => this.deleteGame(name, id)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </a>
        </div>
      );
    }
  };

  renderGames = () => {
    const submissions = this.state.submissions;
    var submissionHolders:any[];
    submissionHolders = [];
    for (var i = 0; i < submissions.length; i++) {
      const id = submissions[i].dbID;
      const name = submissions[i].name;
      submissionHolders.push(
        <div className="col-sm-4">
          <div className="play-link">
            <div className="gamecode-pane chess-pane">
              <div className="row">
                <div className="col-sm-9 text-left">
                <a onClick={() => this.play(id)}><h4>{submissions[i].name}</h4></a>
                </div>
              {this.checkExampleSub(name, id)}
              </div>
              <div className="row">
                <div className="col-sm-3 col-sm-offset-9 delete-link">
                  <a onClick={() => this.setMain(id)}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="col-sm-3 col-sm-offset-9 delete-link">
                  <a onClick={() => this.renameGame(id, 'hhue')}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <p>Modified 2 hours ago</p>
            </div>
          </div>
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
      const submissionIndex = this.state.submissionToOpen;
      const username = this.state.username;
      if (!this.state.challengeUser) {
        return (
          <Redirect push to={'/' + username + '/editor/' + submissionIndex + "/none/none"}/>
        );
      } else {
        const enemyID = this.state.enemyID;
        const enemyName = this.state.enemyName;
        const mainSubmission = this.state.mainSubmission;
        console.log("challenge");
        return (
          <Redirect push to={'/' + username + '/editor/' + mainSubmission + "/" + enemyID + "/" + enemyName}/>
        );
      }
    }

    return (
      <div>
        {this.loginScreen()}
      </div>
    );
  }
}

export default UserProfile;
