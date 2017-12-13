//React
import React from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//Components
import Task from './Task.js';
//Style
import './App.css';

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: 10,
    },
});

const ToDoList = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <h2>My Tasks</h2>
            <h3>Tasks completed: {props.completeTaskCount}</h3>
            <Grid container direction={'row'} alignItems={'flex-start'} justify={'flex-start'} spacing={24}>
                {props.tasks.map(task =>
                    <Task
                        taskName={task.taskName}
                        taskId={task.taskId}
                        taskDate={task.taskDate}
                        onClick={props.onClick}
                    />)}
            </Grid>
        </div>
    );
}
ToDoList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ToDoList);
