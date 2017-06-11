import * as React from 'react';
import Auth from '../modules/Auth';

const logInOut = () => {
  if (!Auth.isUserAuthenticated()) {
    return (
      <span></span>
    );
  } else {
    return (
      <nav className="navbar navigation">
        <div className="container-fluid">
         <div className="row">
           <div className="col-md-4">
           </div>
           <div className="col-md-4 center-logo">
             <img src="../../public/logo.png" width="60px" height="60px"></img>
           </div>
           <div className="col-md-4">
           </div>
         </div>
        </div>
      </nav>
    );
  }
}

export default logInOut;
