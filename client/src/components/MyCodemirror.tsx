import * as React from 'react';

// Codemirror stuff
import * as Codemirror from 'react-codemirror';
import '../css/codemirror.css';
require('codemirror/mode/python/python');

const defaults = {
  markdown: 'def main:\n\t# Start writing here',
};

interface MirrorState {
  code: string;
  mode: string;
}

interface MirrorProps {
  codeOnChange(code: string): void;
}

class MyCodemirror extends React.Component<MirrorProps, MirrorState> {
  constructor(props: MirrorProps) {
    super(props);
    this.state = {
      code: defaults.markdown,
      mode: 'python',
    };
  }

  updateCode = (newCode: string) => {
    this.setState({
      code: newCode
    });

    this.props.codeOnChange(this.state.code);
  };

  render() {
    const options = {
      lineNumbers: true,
      mode: this.state.mode,
    };

    return (
      <Codemirror
        ref="editor"
        value={this.state.code}
        onChange={this.updateCode}
        options={options}
      />
    );
  }
}
export default MyCodemirror;
