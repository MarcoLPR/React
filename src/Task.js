//React
import React, { Component } from 'react';
//Material-UI
import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import DoneIcon from 'material-ui-icons/Done';
import CreateIcon from 'material-ui-icons/Create';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import { red, indigo, grey, purple } from 'material-ui/colors';
//Style
import './App.css';
import EditTask from './EditTask.js';

const danger = red[500]
const primary = indigo[900]
const normal = grey[900]
const edit = purple[500]
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
    },
    favorite: {
        color: danger,
    },
    edit: {
        color: edit
    },
    done: {
        color: primary
    },
    delete: {
        color: normal
    }
});


class Task extends Component {
    state = {
        openDialog: false,
        anchorOrigin: {
            horizontal: 'left',
            vertical: 'bottom',
        },
        targetOrigin: {
            horizontal: 'left',
            vertical: 'top',
        },
    };
    handleClickFavorite = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.taskId, 100);
    }
    handleClickDone = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.taskId, 200);
    }
    handleClickEditTask = (taskDate, taskName) => {
        this.props.onClick(this.props.taskId, 300, taskDate, taskName);
    }
    handleClickDelete = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.taskId, 400);
    }
    handleClickOpenDialog = () => {
        this.setState({ openDialog: true });
    };
    handleClickCloseDialog = () => {
        this.setState({ openDialog: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <div className={classes.date}>{this.props.taskDate}</div>
                        <div className={classes.task}>{this.props.taskName}</div>
                        <CardActions>
                            <Button fab mini aria-label="done" className={classes.done} type="button" onClick={this.handleClickDone}>
                                <DoneIcon />
                            </Button>
                            <Button fab mini aria-label="edit" className={classes.edit} type="button" onClick={this.handleClickOpenDialog}>
                                <CreateIcon />
                            </Button>
                            <Button fab mini aria-label="favorite" className={classes.favorite} type="button" onClick={this.handleClickFavorite}>
                                <FavoriteBorderIcon />
                            </Button>
                            <Button fab mini aria-label="delete" className={classes.delete} type="button" onClick={this.handleClickDelete}>
                                <DeleteIcon />
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
                <EditTask open={this.state.openDialog}
                    onClick={this.handleClickCloseDialog}
                    onSubmit={this.handleClickEditTask}
                    taskName={this.props.taskName}
                    taskDate={this.props.taskDate} />
            </Grid>
        );
    }
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Task);