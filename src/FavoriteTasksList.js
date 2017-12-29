//React
import React from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
//Components
import Task from './Task.js';

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: 10,
    },
});

const FavoriteTasksList = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Grid item xs={9}>
                <List>
                    {props.tasks.map(task =>
                        <Task
                            taskName={task.taskName}
                            taskId={task.taskId}
                            taskDate={task.taskDate}
                            favorite={task.favorite}
                            onClick={props.onClick}
                            type={task.type}
                        />)}
                </List>
            </Grid>
        </div>
    );
}
FavoriteTasksList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(FavoriteTasksList);