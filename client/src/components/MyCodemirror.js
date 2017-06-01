import React, { Component } from 'react';
import logo from '../res/logo.svg';

// Codemirror stuff
import Codemirror from 'react-codemirror';
import '../css/codemirror.css';
require('codemirror/mode/python/python');

var defaults = {
	markdown: 'def main:\n\t# Start writing here',
};

class MyCodemirror extends Component {
	constructor(props) {
		super(props);
		this.state = {
            code: defaults.markdown,
            mode: 'python',
		}
	}

	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	}

	render () {
		var options = {
			lineNumbers: true,
			mode: this.state.mode
		};
		return (
			<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode.bind(this)} options={options} autoFocus={true} />
		);
	}
};

export default MyCodemirror;
