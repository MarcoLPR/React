//React
import React, { Component } from 'react';
//Material-UI
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

class AddTask extends Component {
    state = {
        taskName: '',
        taskDate: '',
        warning: false,
    }
    handleClose = () => {
        this.props.onClick();
        this.setState({ taskName: '', taskDate: '', warning: false })
    };
    handleAdd = event => {
        event.preventDefault();
        if(this.state.taskName === '' || this.state.taskDate === ''){
            this.setState({ warning: true });
        }else{
        this.props.onSubmit(this.state.taskName, this.state.taskDate);
        this.setState({ taskName: '', taskDate: '', warning: false })
        this.props.onClick();
        }
    };
    render() {
        return (
            <div>
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
                            fullWidth
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
                            fullWidth
                        />
                        { this.state.warning ? <Typography color="primary">All fields should have a value</Typography> : null }
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
export default AddTask;