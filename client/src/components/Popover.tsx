import * as React from 'react';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as Button from 'react-bootstrap/lib/Button';

interface PopoverState {
  id: string;
  showModal: boolean;
  value: string
}

interface PopoverProps {
  name:string;
  renameClick:(id: string, name:string) => any;
  id: string
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.name,
      id: props.id,
      showModal: false
    }
  }

  getInitialState = () => {
    return { showModal: false };
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  renameSubmit = () => {
    this.props.renameClick(this.props.id,this.state.value);
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <a onClick={this.open}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.renameSubmit()}>Rename</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default Popover;
