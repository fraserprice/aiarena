import * as React from 'react';
import {NavLink} from 'react-router-dom';
import Auth from '../modules/Auth';

const logInOut = () => {
  if (!Auth.isUserAuthenticated()) {
    return (
      <nav className="navbar navigation">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4 center-logo">
              <img src="../../public/logo.png" width="80px" height="80px"></img>
            </div>
            <div className="col-md-4">
              <NavLink className="btn btn-success register-button" role="button" to="/register">Register</NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navigation">
        <div className="container-fluid">
         <div className="row">
           <div className="col-md-4">
             <ul className="nav navbar-nav">
               <li>
                 <NavLink className="active" to="/">Home</NavLink>
               </li>
               <li>
                 <NavLink className="active" to="/">Games</NavLink>
               </li>
               <li>
                 <NavLink className="active" to="/">About</NavLink>
               </li>
             </ul>
           </div>
           <div className="col-md-4 center-logo">
             <img src="../../public/logo.png" width="80px" height="80px"></img>
           </div>
           <div className="col-md-4">
             <NavLink className="btn btn-success register-button" role="button" to="/logout">Log Out</NavLink>
           </div>
         </div>
        </div>
      </nav>
    );
  }
}

export default logInOut;
