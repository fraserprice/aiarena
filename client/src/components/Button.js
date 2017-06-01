import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

class MyButton extends Component {
  render() {
    return (<Button bsStyle="primary">{this.props.name}</Button>);
  }
}

export default MyButton;
