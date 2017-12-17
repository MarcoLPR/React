//React
import React from 'react';
//Material-UI
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { teal } from 'material-ui/colors';
//Components
import TaskMenu from './TaskMenu.js';

const primary = teal[900];
const styles = {
    root: {
        width: '100%',
    },
    flex: {
        marginLeft: -50,
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        background: primary
    },
    actions: {
        color: 'white'
    }
};

const ToDoBar = (props) => {
    const { classes } = props;
    this.handleClickAddTask = (taskName, taskDate) => {
        props.onSubmit(taskName, taskDate)
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <TaskMenu onSubmit={this.handleClickAddTask} />
                    <Typography type="title" color="inherit" className={classes.flex}>
                        Things to Do
          </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ToDoBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDoBar);