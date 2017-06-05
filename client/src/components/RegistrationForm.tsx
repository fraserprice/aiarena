import * as React from 'react';

interface RegistrationProps {
    uploadAccountDetails(): void
}

class RegistrationForm extends React.Component<RegistrationProps, null> {
    constructor(props: RegistrationProps) {
        super(props);
    }

    uploadAccountDetails = (userName: string, password: string, email: string) => {
        alert('send to backend');
    }

    render() {
        return (
            <div>
                <p>Form</p>
            </div>
        );
    }
}

export default RegistrationForm;
