//React
import React from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//Components
import Task from './Task.js';
import CompletedTask from './CompletedTask';

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
        { props.normalTask ?
            <Grid container direction={'row'} alignItems={'flex-start'} justify={'flex-start'} spacing={24}>
                {props.tasks.map(task =>
                    <Task
                        taskName={task.taskName}
                        taskId={task.taskId}
                        taskDate={task.taskDate}
                        favorite={task.favorite}
                        onClick={props.onClick}
                    />)}
            </Grid>
            : null}
        { props.completedTask ?
            <Grid container direction={'row'} alignItems={'flex-start'} justify={'flex-start'} spacing={24}>
                {props.tasks.map(task =>
                    <CompletedTask
                        taskName={task.taskName}
                        taskId={task.taskId}
                        taskDate={task.taskDate}
                    />)}
            </Grid>
            : null}
        </div>
    );
}
ToDoList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ToDoList);
