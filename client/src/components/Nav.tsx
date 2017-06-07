import * as React from 'react';
import {NavLink} from 'react-router-dom';

function Nav() {
    return (
        <nav className="navigation navbar">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink class="navbar-brand" exact activeClassName='active' to='/'>AI Arena</NavLink>
                </div>
                <ul className="nav navbar-nav">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/">Games</NavLink>
                    <NavLink activeClassName="active" to="/">About</NavLink>
                </ul>
                <ul className="login-nav nav navbar-nav">
                    <NavLink activeClassName="active" to="/login">Login</NavLink>
                </ul>
                <ul className="signup-nav nav navbar-nav">
                    <NavLink activeClassName="active" to="/register">Register</NavLink>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;