//React
import React, { Component } from 'react';
//Material-UI
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';

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
        marginTop: 0,
    },
    task: {
        fontSize: 20,
        color:'white',
        marginTop: 10,
    },
});


class CompletedTask extends Component {
    state = {
    };
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.date}>Completed on: {this.props.taskDate}</Typography>
                        <Typography className={classes.task}>{this.props.taskName}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}
CompletedTask.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CompletedTask);