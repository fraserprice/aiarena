import * as React from 'react';
import '../css/userprofile.css';
import {NavLink} from 'react-router-dom';
import Auth from "../modules/Auth";

const profileURL = 'http://localhost:3000/profile';

interface UserProfileState {
  user: any
}

class UserProfile extends React.Component<any, UserProfileState> {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  unauthorizedLogin() {
    return (
      <div>
        <p id="unauthorized">Please log in or register to visit your profile page</p>
        <ul className="login-nav">
          <NavLink activeClassName="active" to="/login">Login</NavLink>
        </ul>
        <ul className="signup-nav">
          <NavLink activeClassName="active" to="/register">Register</NavLink>
        </ul>
      </div>
    );
  };

  authorizedLogin() {
    return (
      <div>
        <li>Name: {this.state.user.username}</li>
        <li>Email: {this.state.user.email}</li>
      </div>
    )
  };

  authorizedFailedToGetDetails() {
    return(<p>Failed to fetch user details. Please try again.</p>)
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
      callback(JSON.parse(responseJson));
    }).catch((err) => {
      console.log(err);
    });
  };

   render() {
     console.log('here');
     if(Auth.isUserAuthenticated()) {
       if(this.state.user) {
         alert(this.state.user);
         return this.authorizedLogin();
       } else {
         this.getUserDetails((userDetails) => {
           this.setState({user: userDetails});
         });
         return this.authorizedFailedToGetDetails();
       }
     } else {
       return this.unauthorizedLogin();
     }
   }
}

export default UserProfile;
