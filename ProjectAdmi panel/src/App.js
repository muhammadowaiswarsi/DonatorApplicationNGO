import React, { Component } from 'react';
import Rout from './Route';
import { Provider } from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Rout />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
