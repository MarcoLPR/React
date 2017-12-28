//React
import React from 'react';
//Material-UI
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
//Components
import CompletedTask from './CompletedTask';

const styles = theme => ({
    container: {
        flexGrow: 1,
        padding: 10,
    },
});

const CompletedTasksList = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Grid item xs={9}>
                <List>
                    {props.tasks.map(task =>
                        <CompletedTask
                            taskName={task.taskName}
                            taskId={task.taskId}
                            taskDate={task.taskDate}
                            type={task.type}
                        />)}
                </List>
            </Grid>
        </div>
            );
}
CompletedTasksList.propTypes = {
                classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CompletedTasksList);