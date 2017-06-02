import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';

class MyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Button bsStyle="primary" onClick={this.props.uploadCode}>Upload code</Button>;
  }
};

export default MyButton;