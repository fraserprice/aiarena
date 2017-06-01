import React, { Component } from 'react';
import logo from '../res/logo.svg';

// Codemirror stuff
import Codemirror from 'react-codemirror';
import '../css/codemirror.css';
require('codemirror/mode/python/python');
const createReactClass = require('create-react-class');

var defaults = {
	markdown: 'def main:\n\t# Start writing here',
};

var MyCodemirror = createReactClass({
  getInitialState () {
		return {
			code: defaults.markdown,
			mode: 'python',
		};
	},
	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	},
  render () {
		var options = {
			lineNumbers: true,
			mode: this.state.mode
		};
		return (
			<div>
				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
			</div>
		);
	}
});

export default MyCodemirror;
