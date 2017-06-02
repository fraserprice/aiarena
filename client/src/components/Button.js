import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';

class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code : ""
    }
  }

  uploadCode() {
    var code = this.props.getCode();
    var request = require('request');
    var url = 'http://localhost:3001/python';

    request.post(url, { json: {payload : code}}, function (err, res, body) {
      console.error("err");
    })
  }

  render() {
    return <Button bsStyle="primary" onClick={this.uploadCode.bind(this)}>Upload code</Button>;
  }
};

export default MyButton;
