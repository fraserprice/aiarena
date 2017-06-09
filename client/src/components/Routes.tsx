import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Logout from './Logout';
//import Editor from './Editor';
import UserProfile from './UserProfile';
import Auth from '../modules/Auth';

const landingPage = () => {
  if (Auth.isUserAuthenticated()) {
    return (
      <Route exact path="/" component={UserProfile}/>
    );
  } else {
    return (
      <Route exact path="/" component={LoginForm}/>
    );
  }
}

/*const register = () => {*/
  //<Route exact path="/register" component={RegistrationForm}/>
//}

//const login = () => {
  //<Route exact path="/login" component={LoginForm}/>
//}

//const logout = () => {
  //<Route exact path="/logout" component={Logout()}/>
/*}*/

const routes = () => {
  return (
    <Switch>
      {landingPage()}
      <Route exact path="/login" component={LoginForm}/>
      <Route exact path="/register" component={RegistrationForm}/>
      <Route exact path="/logout" component={Logout}/>
    </Switch>
  )
}

export default routes;
