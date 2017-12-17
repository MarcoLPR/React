//React
import React, { Component } from 'react';
//Material-UI
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Popover from 'material-ui/Popover/Popover';
import AddTask from './AddTask.js';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    actions: {
        color: 'white'
    }
};

class TaskMenu extends Component {
    state = {
        open: false,
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
    handleClickPop = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    handleClickOpenDialog = () => {
        this.setState({ openDialog: true });
    };
    handleClickCloseDialog = () => {
        this.setState({ openDialog: false });
    };
    handleClickAddTask = (taskName, taskDate) => {
        this.props.onSubmit(taskName, taskDate)
        this.handleRequestClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <IconButton
                    className={classes.menuButton}
                    color="contrast" aria-label="Menu"
                    onClick={this.handleClickPop}>
                    <MenuIcon />
                </IconButton>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={this.state.anchorOrigin}
                    targetOrigin={this.state.targetOrigin}
                    onRequestClose={this.handleRequestClose}
                >
                    <Button onClick={this.handleClickOpenDialog}>
                        Add Task
                    </Button>
                    <AddTask open={this.state.openDialog}
                        onClick={this.handleClickCloseDialog}
                        onSubmit={this.handleClickAddTask} />
                </Popover>
            </div>
        )
    }
}
TaskMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TaskMenu);