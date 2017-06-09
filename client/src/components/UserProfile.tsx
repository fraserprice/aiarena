import * as React from 'react';
import '../css/userprofile.css';
//import {NavLink} from 'react-router-dom';
import Auth from "../modules/Auth";
import '../css/profile.css';
import {
  Redirect,
} from 'react-router-dom'

//const profileURL = 'http://localhost:3000/profile';
const profileURL = 'https://https://ai-fights.herokuapp.com/profile';

interface UserProfileProps {
}

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
      <div className="container">
      <div className="row profile">
      <div className="col-md-3">
	<div className="profile-sidebar">
		<div className="profile-userpic">
			<img src="/res/profile.jpeg" className="img-responsive" alt=""></img>
		</div>
		<div className="profile-usertitle">
			<div className="profile-usertitle-name">
                          {this.state.username}
			</div>
			<div className="profile-usertitle-job">
				Developer
			</div>
		</div>
		<div className="profile-userbuttons">
			<button type="button" onClick={this.play} className="btn btn-success btn-sm">Play</button>
			<button type="button" className="btn btn-danger btn-sm">Message</button>
		</div>
		<div className="profile-usermenu">
			<ul className="nav">
				<li className="active">
					<a href="#">
					<i className="glyphicon glyphicon-home"></i>
					Overview </a>
				</li>
				<li>
					<a href="#">
					<i className="glyphicon glyphicon-user"></i>
					Account Settings </a>
				</li>
				<li>
					<a href="#" target="_blank">
					<i className="glyphicon glyphicon-ok"></i>
					Submissions </a>
				</li>
				<li>
					<a href="#">
					<i className="glyphicon glyphicon-flag"></i>
					Results </a>
				</li>
			</ul>
		</div>
	</div>
		</div>
		<div className="col-md-9">
            <div className="profile-content">
			   Some user related content goes here...
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
    fetch(profileURL, {
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
