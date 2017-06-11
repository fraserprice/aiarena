import * as React from 'react';
import '../css/App.scss';
import '../css/Pane.scss';
import {BrowserRouter} from 'react-router-dom';
import routes from './Routes';
import Footer from './common/Footer';
import Nav from './Nav';


class App extends React.Component<{}, null> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <div className="container-fluid content">
            {routes()}
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
