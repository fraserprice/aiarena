import * as React from 'react';
import '../css/App.scss';
import {BrowserRouter} from 'react-router-dom';
import routes from './Routes';
import Nav from './Nav';
import Footer from './common/Footer';


class App extends React.Component<{}, null> {
  render() {
    return (
      <BrowserRouter>
          <div>
              <div className="app row container-fluid">
                  <Nav />
                  {routes()}
                  <Footer />
              </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
