//React
import React, { Component } from 'react';
//Material-UI
import Button from "material-ui/Button";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import DoneIcon from 'material-ui-icons/Done';
import CreateIcon from 'material-ui-icons/Create';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import { red } from 'material-ui/colors';
//Style
import './App.css';
import EditTask from './EditTaskDialog.js';
import Typography from 'material-ui/Typography/Typography';

const danger = red[500]
const styles = theme => ({
    card: {
        padding: 16,
        textAlign: 'center',
        color: 'white',
        background: '#222',
    },
    date: {
        textAlign: 'right',
        fontSize: 14,
        color:'white',
        marginTop: -50,
    },
    task: {
        fontSize: 20,
        color:'white',
        marginTop: 10,
    },
    favorite: {
        color: danger,
        background: 'transparent',
        fontSize: 30,
        right: 100,
        bottom: 20,
    },
    actionMenu: {
        marginBottom: '-45px',
    },
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
        this.props.onClick(this.props.taskId, 100, this.props.taskName, this.props.taskDate, true);
    }
    handleClickUnfavorite = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.taskId, 100, this.props.taskName, this.props.taskDate, false);
    }
    handleClickDone = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.taskId, 200, this.props.taskName, this.props.taskDate);
    }
    handleClickEditTask = (taskDate, taskName) => {
        this.props.onClick(this.props.taskId, 300, taskDate, taskName, this.props.favorite);
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
                        {this.props.favorite ?
                            <IconButton aria-label="Unfavorite" className={classes.favorite} type="button" onClick={this.handleClickUnfavorite}>
                                <FavoriteIcon />
                            </IconButton>
                            : null}
                        {!this.props.favorite ?
                            <IconButton aria-label="favorite" className={classes.favorite} type="button" onClick={this.handleClickFavorite}>
                                <FavoriteBorderIcon />
                            </IconButton>
                            : null}
                        <Typography className={classes.date}>{this.props.taskDate}</Typography>
                        <Typography className={classes.task}>{this.props.taskName}</Typography>
                        <CardActions className={classes.actionMenu} spacing={24}>
                            <Button aria-label="done" color='primary' type="button" onClick={this.handleClickDone}>
                                <Typography>DONE</Typography>
                                <DoneIcon />
                            </Button>
                            <Button aria-label="edit" color='primary' type="button" onClick={this.handleClickOpenDialog}>
                                <Typography>EDIT</Typography>
                                <CreateIcon />
                            </Button>
                            <IconButton aria-label="delete" color='primary' type="button" onClick={this.handleClickDelete}>
                                <DeleteIcon />
                            </IconButton>
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