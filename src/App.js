//React
import React, { Component } from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//Components
import ToDoList from './ToDo.js';
import Form from './Form.js';
//Style
import logo from './logo.svg';
import './App.css';

const styles = theme => ({
  app: {
    margin: 20,
  },
});

class App extends Component {
  state = {
    tasks: [],
    taskCount: 0,
    completeTaskCount: 0
  };
  addNewTask = (taskName, taskDate) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.concat({ taskName: taskName, taskDate: taskDate, taskId: (this.state.taskCount + 1) }),
      taskCount: prevState.taskCount + 1
    }));
  }
  deleteTask = (taskId, statusCode) => {
    for (var i = 0; i < (this.state.tasks.length); i++)
      if (this.state.tasks[i].taskId === taskId) {
        this.setState(this.state.tasks.splice(i, 1))
        if (statusCode === 200) {
          this.setState(prevState => ({
            completeTaskCount: prevState.completeTaskCount + 1
          }))
        }
      }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To Do</h1>
        </header>
        <div className={classes.app}>
          <Grid container>
            <Form onSubmit={this.addNewTask} />
            <ToDoList tasks={this.state.tasks} completeTaskCount={this.state.completeTaskCount} onClick={this.deleteTask} />
          </Grid>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);