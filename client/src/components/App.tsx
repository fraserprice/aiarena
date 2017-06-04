import * as React from 'react';
import '../css/App.css';
import Editor from './Editor';

class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="app row container-fluid">
        <Editor />
      </div>
    );
  }
}

export default App;
