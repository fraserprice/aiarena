import * as React from 'react';
import Button from './Button';
import '../css/registrationform.css';
import Auth from '../modules/Auth';

import {
  Redirect,
} from 'react-router-dom'

const loginURL = 'http://localhost:3000/login';

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
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
          return (
            <Redirect to={from}/>
          )
        }

        return (
            <form className="registration">
                <div className="form-group">
                    <label >Username</label>
                    <input type="text" id="username" className="form-control" placeholder="Enter username"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="pass" className="form-control" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <Button onClick={this.uploadLoginDetails}>Login</Button>
                </div>
            </form>
        );
    }
}

export default LoginForm;
