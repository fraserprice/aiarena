import * as React from 'react';
import Button from './Button';
import '../css/registrationform.scss';
import Auth from '../modules/Auth';
import Config from '../config';
import { Redirect, Navlink } from 'react-router-dom';

const config = Config();
const LOGIN_URL = config.hostname + '/login';

class LoginForm extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        redirectToReferrer: false
      }
    }

    private getFormElementById = (id: string) => {
        return (document.getElementById(id) as HTMLInputElement);
    };

    uploadLoginDetails = () => {
        let form = {
            username: this.getFormElementById('username'),
            password: this.getFormElementById('pass'),
        };

        let formValid = true;
        Object.keys(form).forEach((key, index) => {
            let element = form[key];
            if(element == null) {
                formValid = false;
            } else if(element.value == "") {
                element.placeholder = "This field cannot be empty";
                formValid = false;
            }
        });
        if(formValid) {
            Object.keys(form).forEach(key => form[key] = form[key].value);
            fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            }).then((response: any) => {
              return response.json(); }
            ).then((response: any) => {
              Auth.authenticateUser(response.token);
              console.log(response);
              this.setState({ redirectToReferrer: true });
            } );
        }
    };

    render() {
        const { from } = { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
          return (
            <Redirect to={from}/>
          )
        }

        return (
          <div className="row intro-header">
            <div className="container">
              <div className="row">
                  <div className="row landing-content">
                    <div className="col-sm-8">

                    </div>
                    <div className="col-sm-4">
                      <div className="panel panel-default login-panel">
                        <div className="center-group">
                          <h2>Welcome to AI Arena</h2>
                          <p>The place where you battle against others with your AI</p>
                        </div>
                        <div className="panel-body">
                          <form className="registration">
                              <div className="group-padded-down">
                                  <label >Username</label>
                                  <input type="text" id="username" className="form-control" placeholder="Enter username"/>
                              </div>
                              <div className="group-padded-down">
                                  <label>Password</label>
                                  <input type="password" id="pass" className="form-control" placeholder="Password"/>
                              </div>
                              <div className="group-padded-down center-group">
                                  <Button onClick={this.uploadLoginDetails}>Login</Button>
                                  <NavLink className="btn btn-success register-button" role="button" to="/register">Register</NavLink>
                              </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}

export default LoginForm;
