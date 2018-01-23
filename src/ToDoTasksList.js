//React
import React from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import List from 'material-ui/List';
//Components
import Task from './Task.js';

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    button: {
        fontSize: 40,
        bottom: 80,
        right: 80,
        position: 'absolute',
      },
});

const ToDoTasksList = (props) => {
    this.openDialog = () => {
        props.onClick(null, 500);
      };
    const { classes } = props;
    return (
        <div className={classes.container}>
        <Grid item xs={9}>
                <List>
                    {props.tasks ? props.tasks.map(task =>
                        <Task
                            taskName={task.taskName}
                            taskId={task.taskId}
                            taskDate={task.taskDate}
                            favorite={task.favorite}
                            onClick={props.onClick}
                            type={task.type}
                        />):null}
                </List>
        </Grid>
            <Button fab className={classes.button} color='primary' onClick={this.openDialog}>
                <AddIcon />
            </Button>
        </div>
    );
}
ToDoTasksList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ToDoTasksList);