import * as React from 'react';
import '../css/userprofile.css';
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

  loginScreen = () => {
     if(Auth.isUserAuthenticated()) {
       return this.authorizedLoginScreen();
      } else {
       return this.unauthorizedLoginScreen();
     }
  }

   render() {
     return (
       <div>{this.loginScreen()}</div>
      );
   }
}

export default UserProfile;
