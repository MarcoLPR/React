//React
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

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
    closeButton: {
        top: 5,
        left: 25
    }
};

class ToDoBar extends Component {
    state = {
        openDrawer: false,
        title: 'Things To Do',
    };
    toggleDrawer = (open) => () => {
        this.setState({ openDrawer: open });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color='primary'>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            {this.state.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.openDrawer} onClose={this.toggleDrawer(false)}>
                    <IconButton className={classes.closeButton} onClick={this.toggleDrawer(false)}>
                        <ChevronLeftIcon />
                        <Typography>CLOSE</Typography>
                    </IconButton>
                    <div className={classes.list}>
                        <List>
                            <Divider />
                            <ListItem button 
                            component = {Link} to="/"
                            onClick={(event) => this.setState({ title: 'Things To Do' })}>
                                <ListItemText primary="Things to do" />
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            <ListItem button
                            component = {Link} to="/completed"
                            onClick={(event) => this.setState({ title: 'Completed Tasks' })}>
                                <ListItemText primary="Completed Tasks" />
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            <ListItem button
                            component = {Link} to="/favorite"
                            onClick={(event) => this.setState({ title: 'Favorite Tasks' })}>
                                <ListItemText primary="Favorite" />
                                <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                        </List>
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