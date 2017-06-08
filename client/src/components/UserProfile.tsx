import * as React from 'react';
import '../css/userprofile.css';
import Button from './Button';
import {render} from "react-dom";
import {NavLink} from 'react-router-dom';
import Auth from "../modules/Auth";

interface UserProfileProps {
}

class UserProfile extends React.Component<UserProfileProps, null> {
  constructor(props: UserProfileProps) {
    super(props);
  }

  unauthorizedLoginScreen = () => {
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

  authorizedLoginScreen = () => {
    return (<p>Profile...</p>)
  };

   render() {
     if(Auth.isUserAuthenticated()) {
       return this.unauthorizedLoginScreen();
      } else {
       return this.authorizedLoginScreen();
     }
   }
}

export default UserProfile;
