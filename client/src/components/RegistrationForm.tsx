import * as React from 'react';
import * as Request from 'request';
import Button from './Button';
import '../css/registrationform.css';

const registrationURL = 'http://localhost:3000/register';

interface RegistrationProps {
    uploadAccountDetails(): void
}

class RegistrationForm extends React.Component<RegistrationProps, null> {
    constructor(props: RegistrationProps) {
        super(props);
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
            Request.post(registrationURL, { json: { payload: form } }, (err: any, res: Request.RequestResponse, body: any) => {
                if (err) {
                    console.log(err.toString());
                } else {
                    console.log('success');
                }
            });
        }
    };

    render() {
        return (
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
        );
    }
}

export default RegistrationForm;
