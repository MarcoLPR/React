//React
import React, { Component } from 'react';
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
    statusCode: 100,
    viewToDo: true,
    viewCompleted: false,
    viewFavorite: false,
  };
changeView = (statusCode) => {
  switch (statusCode) {
    case 100:
      this.setState({ viewToDo: true, viewCompleted: false, viewFavorite: false });
      break;
    case 200:
      this.setState({ viewToDo: false, viewCompleted: true, viewFavorite: false });
      break;
    case 300:
      this.setState({ viewToDo: false, viewCompleted: false, viewFavorite: true });
      break;
    default:
      break;
  }
}
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <ToDoBar onSubmit={this.changeView}/>
          <ToDoApp
          viewToDo={this.state.viewToDo}
          viewCompleted={this.state.viewCompleted}
          viewFavorite={this.state.viewFavorite}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;