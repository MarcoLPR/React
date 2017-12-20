//React
import React, { Component } from 'react';
//Material-UI
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CreateIcon from 'material-ui-icons/Create'
import MenuIcon from 'material-ui-icons/Menu';
import DoneIcon from 'material-ui-icons/Done';
import FavoriteIcon from 'material-ui-icons/Favorite';
import { teal } from 'material-ui/colors';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

const primary = teal[900];
const styles = {
    root: {
        width: '100%',
    },
    list: {
        width: 240,
    },
    flex: {
        marginLeft: -50,
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        background: primary
    },
    actions: {
        color: 'white'
    }
};

class ToDoBar extends Component {
    state = {
        openDrawer: false,
        title: 'Things To Do',
    };
    /*handleClickAddTask = (taskName, taskDate) => {
        this.props.onSubmit(taskName, taskDate)
    };*/
    toggleDrawer = (open) => () => {
        this.setState({openDrawer: open});
        debugger;
    };
    changeView = (view, statusCode) => () => {
        this.setState({title: view, openDrawer: false});
        this.props.onSubmit(statusCode)
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="contrast" aria-label="Menu"
                            onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            {this.state.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.openDrawer} onClose={this.toggleDrawer(false)}>
                    <IconButton onClick={this.toggleDrawer(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <div className={classes.list}>
                        <List>
                            <ListItem button onClick={this.changeView('Things To Do', 100)}>
                                <ListItemText primary="Things to do" />
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                            </ListItem>
                            <ListItem button onClick={this.changeView('Completed Tasks', 200)}>
                                <ListItemText primary="Completed Tasks" />
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                            </ListItem>
                            <ListItem button onClick={this.changeView('Favorite', 300)}>
                                <ListItemText primary="Favorite" />
                                <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                        <Divider />
                    </div>
                </Drawer>
            </div>
        );
    }
}
ToDoBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDoBar);