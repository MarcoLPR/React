//React
import React, { Component } from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
//Components
import ToDoList from './ToDo.js';
import ToDoBar from './ToDoBar.js';
//Style
import './App.css';

const styles = theme => ({
  app: {
    margin: 20,
  },
  snackBar: {
    textAlign: 'center',
  },
});

class App extends Component {
  state = {
    tasks: [],
    completedTasks: [],
    taskCount: 0,
    completeTaskCount: 0,
    openSnackBar: false,
    snackBarMessage: '',
  };
  handleRequestCloseSnack = () => {
    this.setState({
      openSnackBar: false,
    });
  };
  addNewTask = (taskName, taskDate) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.concat(
        {
          taskName: taskName,
          taskDate: taskDate,
          favorite: false,
          taskId: (this.state.taskCount + 1)
        }),
      taskCount: prevState.taskCount + 1,
      snackBarMessage: 'Task added',
      openSnackBar: true,
    }));
    debugger;
  }
  actionTask = (taskId, statusCode, taskName, taskDate) => {
    var i
    switch (statusCode) {
      case 100:
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            if (this.state.tasks[i].favorite === true) {
              this.setState(tasks => ({
                favorite: false,
              }))
            }
            else {
              this.setState(prevState => ({
                favorite: true,
              }))
            }
          }
        }
        break;
      case 200:
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            this.setState(this.state.tasks.splice(i, 1))
            this.setState(prevState => ({
              completeTaskCount: prevState.completeTaskCount + 1,
              snackBarMessage: 'Task completed',
              openSnackBar: true,
            }))
          }
        }
        break;
      case 300:
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            this.setState(this.state.tasks.splice(i, 1))
            this.setState(prevState => ({
              snackBarMessage: 'Task modified',
              openSnackBar: true,
              tasks: prevState.tasks.concat(
                {
                  taskName: taskName,
                  taskDate: taskDate,
                  favorite: false,
                  taskId: taskId
                }),
            }))
          }
        }
        break;
      case 400:
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            this.setState(this.state.tasks.splice(i, 1))
            this.setState(prevState => ({
              snackBarMessage: 'Task deleted',
              openSnackBar: true,
            }))
          }
        };
        break;
      default:
        break;
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <ToDoBar onSubmit={this.addNewTask} />
        <header className="App-header">
          <h1 className="App-title">Tasks</h1>
          <h2>Tasks completed: {this.state.completeTaskCount}</h2>
        </header>
        <div className={classes.app}>
          <Grid container>
            <ToDoList tasks={this.state.tasks} onClick={this.actionTask} />
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.openSnackBar}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestCloseSnack}
          className={classes.snackBar}
        />
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);