import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDo.js';
import Form from './Form.js';

class App extends Component {
  state = {
    tasks: [],
    count: 0
  };
  addNewTask = (taskInfo) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.concat({taskName: taskInfo, taskId: (this.state.count+1)})
    }));
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Form onSubmit={this.addNewTask}/>
        <ToDoList tasks={this.state.tasks} />
      </div>
    );
  }
}

export default App;
