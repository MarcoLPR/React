//React
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import DoneIcon from 'material-ui-icons/Done';
import FavoriteIcon from 'material-ui-icons/Favorite';
import CreateIcon from 'material-ui-icons/Create';
import Tooltip from 'material-ui/Tooltip';
//Components
import ToDoTasksList from './ToDoTasksList.js';
import CompletedTasksList from './CompletedTasksList.js';
import FavoriteTasksList from './FavoriteTasksList.js';
import AddTask from './AddTaskDialog.js';

const styles = theme => ({
  app: {
    margin: 20,
  },
  badge: {
    margin: 20,
  },
  icon: {
    marginTop:10,
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

  addNewTask = (taskName, taskDate, type) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.concat(
        {
          taskName: taskName,
          taskDate: taskDate,
          favorite: false,
          taskId: (this.state.taskCount + 1),
          type: type
        }),
      taskCount: prevState.taskCount + 1,
      snackBarMessage: 'Task added',
      openSnackBar: true,
      unfinishedTasks: prevState.unfinishedTasks + 1
    }));
  }
  actionTask = (taskId, statusCode, taskName, taskDate, favorite, type) => {
    var i, temporal, n
    switch (statusCode) {
      case 100: //Favorite From To Do
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
                taskId: taskId,
                type: type,
              })
          }))
          n = false
        } else if (favorite === false && n === true) {
          for (i = 0; i < (this.state.favoriteTasks.length); i++) {
            if (this.state.favoriteTasks[i].taskId === taskId) {
              this.setState(this.state.favoriteTasks.splice(i, 1))
              this.setState(prevState => ({ favoriteCount: prevState.favoriteCount - 1 }))
              n = false
            }
          }
        }
        break;
      case 101: //Favorite From Favorite
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
            this.setState(prevState => ({ favoriteCount: prevState.favoriteCount - 1 }))
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
                  taskId: taskId,
                  type: type,
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
            this.setState(prevState => ({favoriteCount: prevState.favoriteCount-1}))
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
            temporal[i].type = type
            this.setState({ tasks: temporal })
          } if (temporal[i].favorite === true) {
            for (i = 0; i < (this.state.favoriteTasks.length); i++) {
              if (this.state.favoriteTasks[i].taskId === taskId) {
                temporal = this.state.favoriteTasks.slice()
                temporal[i].taskName = taskName
                temporal[i].taskDate = taskDate
                temporal[i].taskId = taskId
                temporal[i].favorite = favorite
                temporal[i].type = type
                this.setState({ favoriteTasks: temporal })
              }
            }
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
      case 500: //Open add dialog
        this.setState({ openDialog: true });
        break;
      default:
        break;
    }
  }
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
        <div className={classes.app}>
          <Grid container>
            <Grid item xs={3}>
              <Paper>
                <Grid container>
                  <Grid item xs={4}>
                    <Tooltip id="tooltip-bottom" title="Completed Tasks" placement="bottom">
                      <Badge className={classes.badge} badgeContent={this.state.completeTaskCount} color="accent">
                        <DoneIcon className={classes.icon} color='primary'/>
                      </Badge>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <Tooltip id="tooltip-bottom" title="To Do Tasks" placement="bottom">
                      <Badge className={classes.badge} badgeContent={this.state.unfinishedTasks} color="accent">
                        <CreateIcon className={classes.icon} color='primary'/>
                      </Badge>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <Tooltip id="tooltip-bottom" title="Favorite Tasks" placement="bottom">
                      <Badge className={classes.badge} badgeContent={this.state.favoriteCount} color="accent">
                        <FavoriteIcon className={classes.icon} color='primary'/>
                      </Badge>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Route exact path="/" render={(...props) => <ToDoTasksList {...props} normalTask={true} completedTask={false} tasks={this.state.tasks} onClick={this.actionTask} />} />
            <Route path="/completed" render={(...props) => <CompletedTasksList {...props} normalTask={false} completedTask={true} tasks={this.state.completedTasks} />} />
            <Route path="/favorite" render={(...props) => <FavoriteTasksList {...props} normalTask={true} completedTask={false} tasks={this.state.favoriteTasks} onClick={this.actionTask} />} />
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