//React
import React, { Component } from 'react';
//Material-UI
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        width: '80%',
    },
    field: {
        width: '60%',
        marginRight: 8,
        marginBottom: 20,
    },
});

class AddTask extends Component {
    state = {
        taskName: '',
        taskDate: '',
        type: '',
        warning: false,
    }
    handleClose = () => {
        this.props.onClick();
        this.setState({ taskName: '', taskDate: '', warning: false })
    };
    handleAdd = event => {
        event.preventDefault();
        if (this.state.taskName === '' || this.state.taskDate === '' || this.state.type === '') {
            this.setState({ warning: true });
        } else {
            this.props.onSubmit(this.state.taskName, this.state.taskDate, this.state.type);
            this.setState({ taskName: '', taskDate: '', warning: false, type: '' })
            this.props.onClick();
        }
    };
    handleChange = (event, type) => {
        this.setState({ type });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">New Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id='taskName'
                            value={this.state.taskName}
                            onChange={(event) => this.setState({ taskName: event.target.value })}
                            label="Task"
                            type="text"
                            className={classes.field}
                        />
                        <TextField
                            required
                            margin="dense"
                            value={this.state.taskDate}
                            onChange={(event) => this.setState({ taskDate: event.target.value })}
                            id="taskDate"
                            label="Date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type="date"
                        />
                        <FormControl className={classes.formControl} required>
                            <FormLabel component="legend">Type</FormLabel>
                            <Grid container>
                                <Grid item xs={6}>
                                    <RadioGroup
                                        aria-label="Type"
                                        name="Type"
                                        value={this.state.type}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel value='Fitness' control={<Radio />} label="Fitness" />
                                        <FormControlLabel value='Bills' control={<Radio />} label="Bills" />
                                        <FormControlLabel value='Food' control={<Radio />} label="Food" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item>
                                    <RadioGroup
                                        aria-label="Type"
                                        name="Type"
                                        value={this.state.type}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel value="Call" control={<Radio />} label="Call" />
                                        <FormControlLabel value="Study" control={<Radio />} label="Study" />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </FormControl>
                        {this.state.warning ? <Typography color="primary">All fields should have a value</Typography> : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAdd} color="primary">
                            Add
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
AddTask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTask);