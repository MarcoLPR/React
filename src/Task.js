//React
import React from 'react';
//Material-UI
import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import DoneIcon from 'material-ui-icons/Done';
//Style
import './App.css';

const styles = theme => ({
    card: {
        padding: 16,
        textAlign: 'center',
        color: 'white',
        background: '#222',
        borderRadius: '10%'
    },
    date: {
        textAlign: 'right',
        padding: 0,
        fontSize: 14
    },
    task: {
        fontSize: 20
    }
});


const Task = (props) => {
    const { classes } = props;
    this.handleClickDelete = (event) => {
        event.preventDefault();
        props.onClick(props.taskId, 400);
    }
    this.handleClickDone = (event) => {
        event.preventDefault();
        props.onClick(props.taskId, 200);
    }
    return (
        <Grid item xs={3}>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container direction={'column'} alignItems={'center'} justify={'center'} spacing={24}>
                        <div className={classes.date}>{props.taskDate}</div>
                        <div className={classes.task}>{props.taskName}</div>
                        <CardActions>
                            <Button fab mini aria-label="done" color='primary' type="button" onClick={this.handleClickDone}>
                                <DoneIcon />
                            </Button>
                            <Button fab mini aria-label="delete" color='secundary' type="button" onClick={this.handleClickDelete}>
                                <DeleteIcon />
                            </Button>
                        </CardActions>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Task);