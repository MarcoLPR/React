//React
import React, { Component } from 'react';
//Material-UI
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import DirectionRunsIcon from 'material-ui-icons/DirectionsRun';
import LocalAtmIcon from 'material-ui-icons/LocalAtm';
import LocalDiningIcon from 'material-ui-icons/LocalDining';
import LocalPhoneIcon from 'material-ui-icons/LocalPhone';
import SchoolIcon from 'material-ui-icons/School';

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

class CompletedTask extends Component {
    state = {
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <ListItem className={classes.root}>
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
                        secondary={'Completed on ' + this.props.taskDate}
                    />
                </ListItem>
            </div>
        );
    }
}
CompletedTask.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CompletedTask);