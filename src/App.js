//React
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
//Components
import ToDoApp from './ToDoApp.js';
import ToDoBar from './ToDoBar.js';
//Material-UI
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { teal, amber } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
    secondary: amber,
  },
});
class App extends Component {
  state = {
  };
  render() {
    return (
      <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <ToDoBar/>
          <ToDoApp/>
        </div>
      </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;