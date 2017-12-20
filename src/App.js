//React
import React, { Component } from 'react';
//Components
import ToDoApp from './ToDoApp.js';
import ToDoBar from './ToDoBar.js';
//Style
import './App.css';

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
      <div className="App">
        <ToDoBar onSubmit={this.changeView}/>
        <ToDoApp
        viewToDo={this.state.viewToDo}
        viewCompleted={this.state.viewCompleted}
        viewFavorite={this.state.viewFavorite}/>
      </div>
    );
  }
}

export default App;