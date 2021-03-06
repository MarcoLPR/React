//React
import React, { Component } from 'react';
//Material-UI
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import DoneIcon from 'material-ui-icons/Done';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import PropTypes from 'prop-types';
import {
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import DirectionRunsIcon from 'material-ui-icons/DirectionsRun';
import LocalAtmIcon from 'material-ui-icons/LocalAtm';
import LocalDiningIcon from 'material-ui-icons/LocalDining';
import LocalPhoneIcon from 'material-ui-icons/LocalPhone';
import SchoolIcon from 'material-ui-icons/School';
//Components
import './App.css';
import EditTask from './EditTaskDialog.js';

const styles = theme => ({
    root: {
        backgroundColor: '#424242',
        color: '#424242',
        borderRadius: 3,
        border: 0,
        boxShadow: '0 0px 5px 0 black',
    },
    colorDefault: {
        color: 'white',
    }
});

class Task extends Component {
    state = {
        openDialog: false,
    };
    favoriteTask = (event) => {
        event.preventDefault();
        let changeTask = {
            taskName: this.props.taskName,
            taskId: this.props.taskId,
            taskDate: this.props.taskDate,
            favorite: true,
            type: this.props.type
        }
        this.props.onClick(changeTask, 100)
    }
    unfavoriteTask = (event) => {
        event.preventDefault();
        let changeTask = {
            taskName: this.props.taskName,
            taskId: this.props.taskId,
            taskDate: this.props.taskDate,
            favorite: false,
            type: this.props.type
        }
        this.props.onClick(changeTask, 100)
    }
    completeTask = (event) => {
        event.preventDefault();
        let changeTask = {
            taskName: this.props.taskName,
            taskId: this.props.taskId,
            taskDate: this.props.taskDate,
            favorite: this.props.favorite,
            type: this.props.type
        }
        this.props.onClick(changeTask, 200)
    }
    editTask = (taskName, taskDate, type) => {
        let changeTask = {
            taskName: taskName,
            taskId: this.props.taskId,
            taskDate: taskDate,
            favorite: this.props.favorite,
            type: type
        }
        this.props.onClick(changeTask, 300)
    }
    deleteTask = (event) => {
        event.preventDefault();
        let changeTask = {
            taskId: this.props.taskId,
        }
        this.props.onClick(changeTask, 400);
    };
    openDialog = () => {
        this.setState({ openDialog: true });
    };
    closeDialog = () => {
        this.setState({ openDialog: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Tooltip id="tooltip-bottom" title="Click to Edit" placement="bottom">
                    <ListItem className={classes.root} onClick={this.openDialog}>
                        <Tooltip id="tooltip-bottom" title={this.props.type} placement="bottom">
                            <ListItemAvatar color='primary'>
                                <Avatar className={classes.colorDefault}>
                                    {this.props.type === 'Fitness' ? <DirectionRunsIcon /> : null}
                                    {this.props.type === 'Bills' ? <LocalAtmIcon /> : null}
                                    {this.props.type === 'Food' ? <LocalDiningIcon /> : null}
                                    {this.props.type === 'Call' ? <LocalPhoneIcon /> : null}
                                    {this.props.type === 'Study' ? <SchoolIcon /> : null}
                                </Avatar>
                            </ListItemAvatar>
                        </Tooltip>
                        <ListItemText
                            primary={this.props.taskName}
                            secondary={'Due to ' + this.props.taskDate}
                        />
                        <ListItemSecondaryAction>
                            <Tooltip id="tooltip-bottom" title="Complete" placement="bottom">
                                <IconButton aria-label="done" color='primary' type="button" onClick={this.completeTask}>
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            {this.props.favorite ?
                                <Tooltip id="tooltip-bottom" title="Unfavorite" placement="bottom">
                                    <IconButton aria-label="Unfavorite" color='primary' type="button" onClick={this.unfavoriteTask}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip id="tooltip-bottom" title="Favorite" placement="bottom">
                                    <IconButton aria-label="favorite" color='primary' type="button" onClick={this.favoriteTask}>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </Tooltip>
                                }
                            <Tooltip id="tooltip-bottom" title="Delete" placement="bottom">
                                <IconButton aria-label="delete" color='primary' type="button" onClick={this.deleteTask}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Tooltip>
                <EditTask open={this.state.openDialog}
                    onClick={this.closeDialog}
                    onSubmit={this.editTask}
                    taskName={this.props.taskName}
                    taskDate={this.props.taskDate}
                    type={this.props.type}
                    />
            </div>
        );
    }
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Task);