import * as React from 'react';

// Codemirror stuff
import * as Codemirror from 'react-codemirror';
import '../css/codemirror.scss';
require('codemirror/mode/python/python');

interface MirrorState {
  mode: string;
}

interface MirrorProps {
  codeOnChange: (code: string) => void;
  getCode: () => string
}

class MyCodemirror extends React.Component<MirrorProps, MirrorState> {
  constructor(props: MirrorProps) {
    super(props);
    this.state = {
      mode: 'python',
    };
  }

  updateCode = (newCode: string) => {
    this.props.codeOnChange(newCode);
  };

  render() {
    const options = {
      lineNumbers: true,
      mode: this.state.mode,
    };

    return (
      <Codemirror
        ref="editor"
        value={this.props.getCode()}
        onChange={this.updateCode}
        options={options}
      />
    );
  }
}
export default MyCodemirror;
