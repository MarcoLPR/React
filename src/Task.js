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
        this.props.onClick(this.props.taskId, 100, this.props.taskName, this.props.taskDate, true, this.props.type);
    }
    handleClickUnfavorite = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.taskId, 100, this.props.taskName, this.props.taskDate, false, this.props.type);
    }
    handleClickDone = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.taskId, 200, this.props.taskName, this.props.taskDate, false, this.props.type);
    }
    handleClickEditTask = (taskDate, taskName, type) => {
        this.props.onClick(this.props.taskId, 300, taskDate, taskName, this.props.favorite, type);
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
            <div>
                <Tooltip id="tooltip-bottom" title="Click to Edit" placement="bottom">
                    <ListItem className={classes.root} onClick={this.handleClickOpenDialog}>
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
                                <IconButton aria-label="done" color='primary' type="button" onClick={this.handleClickDone}>
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            {this.props.favorite ?
                                <Tooltip id="tooltip-bottom" title="Unfavorite" placement="bottom">
                                    <IconButton aria-label="Unfavorite" color='primary' type="button" onClick={this.handleClickUnfavorite}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </Tooltip>
                                : null}
                            {!this.props.favorite ?
                                <Tooltip id="tooltip-bottom" title="Favorite" placement="bottom">
                                    <IconButton aria-label="favorite" color='primary' type="button" onClick={this.handleClickFavorite}>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </Tooltip>
                                : null}
                            <Tooltip id="tooltip-bottom" title="Delete" placement="bottom">
                                <IconButton aria-label="delete" color='primary' type="button" onClick={this.handleClickDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Tooltip>
                <EditTask open={this.state.openDialog}
                    onClick={this.handleClickCloseDialog}
                    onSubmit={this.handleClickEditTask}
                    taskName={this.props.taskName}
                    taskDate={this.props.taskDate}
                    type={this.props.type} />
            </div>
        );
    }
}
Task.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Task);