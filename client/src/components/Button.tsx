import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

interface ButtonProps {
  uploadCode(): void
}

class MyButton extends React.Component<ButtonProps, null> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return <ReactBootstrap.Button bsStyle="primary" onClick={this.props.uploadCode}>Upload code</ReactBootstrap.Button>;
  }
}

export default MyButton;
