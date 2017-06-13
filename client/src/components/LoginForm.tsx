import * as React from 'react';
import '../css/registrationform.scss';
import Auth from '../modules/Auth';
import '../css/main.scss'
import '../css/devices.scss'
import Button from './Button';
import { Redirect, NavLink } from 'react-router-dom';
//const loginURL = 'http://localhost:3000/login';
import Config from '../config';
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
          <div className="row">
          <div className="header">
            <div className="container-lrg">
              <div className="col-12 spread">
                <div className="logo">
                  AI Arena
                </div>
                <div>
                  <a className="nav-link" href="#register">
                    Login
                  </a>
                </div>
              </div>
            </div>
            <div className="container-sml">
              <div className="col-12 text-center">
                <h1 className="heading">
                  Challenge your friends to an AI Match
                </h1>
                <h2 className="paragraph">
                  AI Arena is an online tool made for anyone passionate about game AI’s to visualise, profile and share the results of their algorithm fighting another AI. You can challenge friends or companies to see who’s best!
                </h2>
                <div className="ctas">
                  <NavLink className="ctas-button" role="button" to="/register">Register</NavLink>
                </div>
              </div>
            </div>
            <div className="container-lrg">
              <div className="centerdevices col-12">
                <div className="computerwrapper" id="register">
                  <div className="computer">
                    <div className="mask">
                    <div className="panel-body">
                      <div className="col-md-10 col-md-offset-1 top-margin">
                      <form className="registration">
                          <div className="group-padded-down">
                              <label>Username</label>
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
                </div>
              </div>
            </div>
          </div>
          <div className="feature3">
            <div className="container-lrg row">
              <div className="col-md-4">
                <b className="emoji">
                  🖥
                </b>
                <h3 className="subheading">
                  Battle against others with your AI
                </h3>
                <p className="paragraph">
                    AI Arena is an online tool made for anyone passionate about game AI’s to visualise, profile and share the results of their algorithm fighting another AI. You can challenge friends or companies to see who’s best!
                </p>
              </div>
              <div className="col-md-4">
                <b className="emoji">
                  🎉
                </b>
                <h3 className="subheading">
                  Real time results on the editor page
                </h3>
                <p className="paragraph">
                  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </p>
              </div>
              <div className="col-md-4">
                <b className="emoji">
                  🚀
                </b>
                <h3 className="subheading">
                  Keep track of your games
                </h3>
                <p className="paragraph">
                 Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </p>
              </div>
            </div>
          </div>
          <div className="socialproof">
            <div className="container-sml">
              <div className="text-center">
                <div className="col-12">
                  <h4 className="subheading">
                    "Nejaky komentar sem od nasho Janka"
                  </h4>
                  <p className="paragraph">
                    Jan Matas - Software Engineer
                  </p>
                </div>
              </div>
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

export default LoginForm;
