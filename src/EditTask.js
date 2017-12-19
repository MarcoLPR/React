//React
import React, { Component } from 'react';
//Material-UI
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

class EditTask extends Component {
    state = {
        taskName: this.props.taskName,
        taskDate: this.props.taskDate,
    }
    handleClose = () => {
        this.props.onClick();
    };
    handleEdit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.taskName, this.state.taskDate);
        this.setState({ taskName: '', taskDate: '', })
        this.props.onClick();
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEdit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default EditTask;