import * as React from 'react';
import Button from './Button';
import '../css/registrationform.scss';
import Auth from '../modules/Auth';

import {
  Redirect,
} from 'react-router-dom'

//const loginURL = 'http://localhost:3000/login';
const loginURL = 'https://ai-fights.herokuapp.com/login';

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
            fetch(loginURL, {
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
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="panel panel-default login-panel">
                  <div className="center-group">
                    <h2>Log In to AI Arena</h2>
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
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default LoginForm;
