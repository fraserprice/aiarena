import * as React from 'react';
import * as ReactBootstrap from 'react-bootstrap';

interface ButtonProps {
  onClick(): void
}

class MyButton extends React.Component<ButtonProps, null> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return <ReactBootstrap.Button bsStyle="primary" onClick={this.props.onClick}>{this.props.children}</ReactBootstrap.Button>;
  }
}

export default MyButton;
