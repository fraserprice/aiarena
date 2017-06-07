import * as React from 'react';
import Button from './Button';
import '../css/registrationform.css';

const loginURL = 'http://localhost:3000/login';

interface RegistrationProps {
    uploadLoginDetails(): void
}

class LoginForm extends React.Component<RegistrationProps, null> {
    constructor(props: RegistrationProps) {
        super(props);
    }

    private getFormElementById = (id: string) => {
        return (document.getElementById(id) as HTMLInputElement);
    };

    private uploadLoginDetails = () => {
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
            }).then(() => alert('Success!')).catch(() => alert('Failed!'));
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
