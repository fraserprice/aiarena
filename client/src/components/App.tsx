import * as React from 'react';
import '../css/App.css';
import {BrowserRouter} from 'react-router-dom';
import routes from './Routes';
import Nav from './Nav';


class App extends React.Component<{}, null> {
  render() {
    return (
      <BrowserRouter>
          <div>
              <div className="app row container-fluid">
                  <Nav />
                  {routes()}
              </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
