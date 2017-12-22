//React
import React, { Component } from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add'
//Components
import ToDoList from './ToDoList.js';
import AddTask from './AddTaskDialog.js';

const styles = theme => ({
  app: {
    margin: 20,
  },
  button: {
    fontSize: 40,
    bottom: 80,
    right: 80,
    position: 'absolute',
  }
});

class ToDoApp extends Component {
  state = {
    tasks: [],
    completedTasks: [],
    favoriteTasks: [],
    taskCount: 0,
    unfinishedTasks: 0,
    completeTaskCount: 0,
    favoriteCount: 0,
    openSnackBar: false,
    snackBarMessage: '',
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
      unfinishedTasks: prevState.unfinishedTasks + 1
    }));
  }
  actionTask = (taskId, statusCode, taskName, taskDate, favorite) => {
    var i, temporal, n
    switch (statusCode) {
      case 100: //Favorite
        if (this.props.viewToDo === true) {
          for (i = 0; i < (this.state.tasks.length); i++) {
            if (this.state.tasks[i].taskId === taskId) {
              temporal = this.state.tasks.slice()
              temporal[i].favorite = favorite
              this.setState({ tasks: temporal })
              n = true
            }
          }
          if (n === true && favorite === true) {
            this.setState(prevState => ({
              favoriteCount: prevState.favoriteCount + 1,
              favoriteTasks: prevState.favoriteTasks.concat(
                {
                  taskName: taskName,
                  taskDate: taskDate,
                  favorite: favorite,
                  taskId: taskId
                })
            }))
            n = false
          } else if (favorite === false && n === true) {
            for (i = 0; i < (this.state.favoriteTasks.length); i++) {
              if (this.state.favoriteTasks[i].taskId === taskId) {
                this.setState(this.state.favoriteTasks.splice(i, 1))
                this.setState(prevState => ({favoriteCount: prevState.favoriteCount - 1}))
                n = false
              }
            }
          }
          break;
        } else {
          for (i = 0; i < (this.state.tasks.length); i++) {
            if (this.state.tasks[i].taskId === taskId) {
              temporal = this.state.tasks.slice()
              temporal[i].favorite = favorite
              this.setState({ tasks: temporal })
            }
          }
          for (i = 0; i < (this.state.favoriteTasks.length); i++) {
            if (this.state.favoriteTasks[i].taskId === taskId) {
              this.setState(this.state.favoriteTasks.splice(i, 1))
              this.setState(prevState => ({favoriteCount: prevState.favoriteCount - 1}))
            }
          }
        }
        break;
      case 200: //Done
        var today = new Date();
        taskDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
              unfinishedTasks: prevState.unfinishedTasks - 1
            }))
          }
        }
        for (i = 0; i < (this.state.favoriteTasks.length); i++) {
          if (this.state.favoriteTasks[i].taskId === taskId) {
            this.setState(this.state.favoriteTasks.splice(i, 1))
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
            this.setState({ tasks: temporal })
          }if(temporal[i].favorite === true){
            for (i = 0; i < (this.state.favoriteTasks.length); i++) {
              if (this.state.favoriteTasks[i].taskId === taskId) {
                temporal = this.state.favoriteTasks.slice()
                temporal[i].taskName = taskName
                temporal[i].taskDate = taskDate
                temporal[i].taskId = taskId
                temporal[i].favorite = favorite
                this.setState({ favoriteTasks: temporal })
          }
        }}}
        break;
      case 400: //Delete
        for (i = 0; i < (this.state.tasks.length); i++) {
          if (this.state.tasks[i].taskId === taskId) {
            this.setState(this.state.tasks.splice(i, 1))
            this.setState(prevState => ({
              snackBarMessage: 'Task deleted',
              openSnackBar: true,
              unfinishedTasks: prevState.unfinishedTasks - 1
            }))
          }
        };
        for (i = 0; i < (this.state.favoriteTasks.length); i++) {
          if (this.state.favoriteTasks[i].taskId === taskId) {
            this.setState(this.state.favoriteTasks.splice(i, 1))
            this.setState(prevState => ({
              favoriteCount: prevState.favoriteCount - 1
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
  closeSnack = () => {
    this.setState({
      openSnackBar: false,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
        {this.props.viewToDo ?  <h2>Tasks to do: {this.state.unfinishedTasks}</h2>: null}
        {this.props.viewCompleted ? <h2>Tasks completed: {this.state.completeTaskCount}</h2> : null}
        {this.props.viewFavorite ?  <h2>Favorite tasks: {this.state.favoriteCount}</h2>: null}
        </header>
        <div className={classes.app}>
          <Grid container>
            {this.props.viewToDo ? <ToDoList normalTask={true} completedTask={false} tasks={this.state.tasks} onClick={this.actionTask} /> : null}
            {this.props.viewCompleted ? <ToDoList normalTask={false} completedTask={true} tasks={this.state.completedTasks} onClick={this.actionTask} /> : null}
            {this.props.viewFavorite ? <ToDoList normalTask={true} completedTask={false} tasks={this.state.favoriteTasks} onClick={this.actionTask} /> : null}
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
        {this.props.viewToDo ?
          <Button fab className={classes.button} color='primary' onClick={this.openDialog}>
            <AddIcon />
          </Button>
          : null}
        <AddTask open={this.state.openDialog}
          onClick={this.closeDialog}
          onSubmit={this.addNewTask} />
      </div>
    );
  }
}
ToDoApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDoApp);