//React
import React, { Component } from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
//Components
import ToDoList from './ToDoList.js';
import AddTask from './AddTaskDialog.js';
//Style
import './App.css';

const styles = theme => ({
  app: {
    margin: 20,
  },
  button: {
    color: 'white'
  }
});

class ToDoApp extends Component {
  state = {
    tasks: [],
    completedTasks: [],
    favoriteTasks: [],
    taskCount: 0,
    completeTaskCount: 0,
    openSnackBar: false,
    snackBarMessage: '',
  };
  closeSnack = () => {
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
  }
  actionTask = (taskId, statusCode, taskName, taskDate, favorite) => {
    var i, temporal
    switch (statusCode) {
      case 100: //Favorite
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            temporal = this.state.tasks.slice()
            temporal[i].favorite = favorite
            this.setState({tasks: temporal})
            if(favorite === true){
            this.setState(prevState => ({
              favoriteTasks: prevState.completedTasks.concat(
                {
                  taskName: taskName,
                  taskDate: taskDate,
                  favorite: favorite,
                  taskId: taskId
                })
              }))
            }else{
              this.setState(this.state.favoriteTasks.splice(i, 1))
            }
            debugger;
          }
        }
        break;
      case 200: //Done
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            this.setState(prevState => ({
              completedTasks: prevState.completedTasks.concat(
                {
                  taskName: taskName,
                  taskDate: taskDate,
                  favorite: false,
                  taskId: taskId
                })
              }))
            this.setState(this.state.tasks.splice(i, 1))
            this.setState(prevState => ({
              completeTaskCount: prevState.completeTaskCount + 1,
              snackBarMessage: 'Task completed',
              openSnackBar: true,
            }))
          }
        }
        break;
      case 300: //Edit
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            temporal = this.state.tasks.slice()
            temporal[i].taskName = taskName
            temporal[i].taskDate = taskDate
            temporal[i].taskId = taskId
            temporal[i].favorite = favorite
            this.setState({tasks: temporal})
          }
        }
        break;
      case 400: //Delete
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
  openDialog = () => {
    this.setState({ openDialog: true });
  };
  closeDialog = () => {
    this.setState({ openDialog: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tasks</h1>
          <h2>Tasks completed: {this.state.completeTaskCount}</h2>
          <Button className={classes.button} onClick={this.openDialog}>Add Task</Button>
          <AddTask open={this.state.openDialog}
                        onClick={this.closeDialog}
                        onSubmit={this.addNewTask} />
        </header>
        <div className={classes.app}>
          <Grid container>
            { this.props.viewToDo ? <ToDoList tasks={this.state.tasks} onClick={this.actionTask} /> : null}
            { this.props.viewCompleted ? <ToDoList tasks={this.state.completedTasks} onClick={this.actionTask} /> : null}
            { this.props.viewFavorite ? <ToDoList tasks={this.state.favoriteTasks} onClick={this.actionTask} /> : null}
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.openSnackBar}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={this.closeSnack}
          className={classes.snackBar}
        />
      </div>
    );
  }
}
ToDoApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ToDoApp);