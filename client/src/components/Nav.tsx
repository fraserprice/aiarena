import * as React from 'react';
import {NavLink} from 'react-router-dom';
import Auth from '../modules/Auth';

const logInOut = () => {
  if (!Auth.isUserAuthenticated()) {
    return ([
      <ul className="signup-nav nav navbar-nav">
          <NavLink activeClassName="active" to="/login">Login</NavLink>
      </ul>,
      <ul className="signup-nav nav navbar-nav">
          <NavLink activeClassName="active" to="/register">Register</NavLink>
      </ul>
    ]);
  } else {
    return (
      <ul className="signup-nav nav navbar-nav">
        <NavLink activeClassName="active" to="/logout">Log out</NavLink>
      </ul>
    );
  }
}

const Nav = () => {
        return (
        <nav className="navigation navbar">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink class="navbar-brand" exact activeClassName='active' to='/'>AI Arena</NavLink>
                </div>
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/">Games</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/">About</NavLink>
                  </li>
                </ul>
                {logInOut()}
            </div>
        </nav>
    )
}

export default Nav;
