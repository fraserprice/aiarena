import * as React from 'react';
import '../css/App.css';
import Editor from './Editor';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";


class App extends React.Component<{}, null> {
  render() {
    return (
      <Router>
          <div>
              <div className="app row container-fluid">
                  <Nav />
                  <Switch>
                      <Route exact path="/" component={Editor}/>
                      <Route path="/register" component={RegistrationForm}/>
                      <Route path="/login" component={LoginForm}/>
                      <Route render={() => {
                          return <p>Page not found</p>
                      }}/>
                  </Switch>
              </div>
          </div>
      </Router>
    );
  }
}

export default App;
