import * as React from 'react';
import Button from './Button';
import '../css/registrationform.scss';
import { Redirect } from 'react-router-dom';
import Config from '../config';

const config = Config();
const REGISTER_URL = config.hostname + '/register';

interface RegistrationProps {
  uploadAccountDetails(): void
}

interface RegistrationState {
  redirectToUserProfile: boolean
}

class RegistrationForm extends React.Component<RegistrationProps, RegistrationState> {
  constructor(props: RegistrationProps) {
    super(props);
    this.state = {
      redirectToUserProfile: false
    }
  }
  private getFormElementById = (id: string) => {
    return (document.getElementById(id) as HTMLInputElement);
  };

  private uploadAccountDetails = () => {
    let form = {
      username: this.getFormElementById('username'),
      email: this.getFormElementById('email'),
      password: this.getFormElementById('pass'),
      confirmedPassword: this.getFormElementById('confirm-pass')
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
    if(form.password.value != form.confirmedPassword.value) {
      form.password.value = "";
      form.confirmedPassword.value = "";
      form.password.placeholder = "Passwords did not match";
    } else if(formValid) {
      Object.keys(form).forEach(key => form[key] = form[key].value);
      fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      }).then((response: any) => {
        if (response.status !== 200) {
          alert("Registration failed!");
        } else {
          return response.json();
        }
      }).then((response: any) => {
        if (response !== undefined) {
          alert(JSON.parse(JSON.stringify(response)).message);
          this.setState({
            redirectToUserProfile: true
          });
        }
      });
    }
  };

  render() {
    if(this.state.redirectToUserProfile) {
      return (
        <Redirect to={'/'}/>
      );
    }

    return (
      <div className="row">
      <div className="header">
        <div className="container-lrg">
        <div className="col-12 spread">
          <div className="logo">
           AI Arena
          </div>
        </div>
      </div>

      <div className="container-sml the-thing">
      <form className="registration">
        <div className="form-group">
          <label >Username</label>
          <input type="text" id="username" className="form-control" placeholder="Enter username"/>
        </div>
        <div className="form-group">
          <label >Email address</label>
          <input type="email" id="email" className="form-control" placeholder="Enter email address"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" id="pass" className="form-control" placeholder="Password"/>
        </div>
        <div className="form-group">
          <input type="password" id="confirm-pass" className="form-control" placeholder="Confirm Password"/>
        </div>
        <div className="form-group">
          <Button onClick={this.uploadAccountDetails}>Register</Button>
        </div>
      </form>
      </div>
      </div>
      <div className="footer">
            <div className="container-sml">
              <div className="col-12 text-center">
                <div>
                  <a className="nav-link">
                    About
                  </a>
                  <a className="nav-link">
                    Legas
                  </a>
                  <a className="nav-link">
                    Contact
                  </a>
                  <a className="nav-link">
                    TOS
                  </a>
                  <a className="nav-link">
                    Privacy
                  </a>
                </div>
                <div>
                  <span>
                    Imperial Colidz
                  </span>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
