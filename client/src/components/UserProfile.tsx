import * as React from 'react';
import '../css/userprofile.css';
//import {NavLink} from 'react-router-dom';
import Auth from "../modules/Auth";
import '../css/profile.css';

const profileURL = 'http://localhost:3000/profile';

interface UserProfileProps {
}

interface UserProfileData {
  loaded: boolean;
  username: string;
  email: string;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileData> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
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
			<button type="button" className="btn btn-success btn-sm">Challenge</button>
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
          alert(userDetails);
        });
        return this.authorizedLogin();
      } else {
        return this.authorizedLogin();
      }
      //TODO: Not sure how to handle this as its async. Will continue tomorrow.
      //return this.authorizedFailedToGetDetails();
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
    return (
      <div>
        {this.loginScreen()}
      </div>
    );
  }
}

export default UserProfile;
