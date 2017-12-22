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
import Typography from 'material-ui/Typography/Typography';

class EditTask extends Component {
    state = {
        taskName: this.props.taskName,
        taskDate: this.props.taskDate,
        warning: false,
    }
    closeDialog = () => {
        this.props.onClick();
        this.setState({warning: false})
    };
    handleEdit = event => {
        event.preventDefault();
        if(this.state.taskName === '' || this.state.taskDate === ''){
            this.setState({ warning: true });
        }else{
        this.props.onSubmit(this.state.taskName, this.state.taskDate);
        this.props.onClick();
        this.setState({warning: false})
        }
    };
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.closeDialog}
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