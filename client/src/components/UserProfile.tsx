import * as React from 'react';
import '../css/userprofile.css';
import {NavLink} from 'react-router-dom';
import Auth from "../modules/Auth";

const profileURL = 'http://localhost:3000/profile';

interface UserProfileProps {
}

class UserProfile extends React.Component<UserProfileProps, null> {
  constructor(props: UserProfileProps) {
    super(props);
  }

  unauthorizedLogin() {
    return ([
      <p id="unauthorized">Please log in or register to visit your profile page</p>,
      <ul className="login-nav">
        <NavLink activeClassName="active" to="/login">Login</NavLink>
      </ul>,
      <ul className="signup-nav">
        <NavLink activeClassName="active" to="/register">Register</NavLink>
      </ul>
    ]);
  };

  authorizedLogin() {
    return (<p>Profile...</p>)
  };

  authorizedFailedToGetDetails() {
    return(<p>Failed to fetch user details. Please try again.</p>)
  };

  loginScreen() {
    if(Auth.isUserAuthenticated()) {
      this.getUserDetails((userDetails) => {
        alert(userDetails);
        return this.authorizedLogin();
      });
      //TODO: Not sure how to handle this as its async. Will continue tomorrow.
      return this.authorizedFailedToGetDetails();
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
    }).then((responseJson) => {
      callback(responseJson);
    }).catch((err) => {
      alert(err);
    });
  };

   render() {
     return (
       <div>{this.loginScreen()}</div>
      );
   }
}

export default UserProfile;
