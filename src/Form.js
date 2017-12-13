//React
import React, { Component } from 'react';
//Material-UI
import Button from "material-ui/Button";
import AddIcon from 'material-ui-icons/Add';
import Snackbar from 'material-ui/Snackbar';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//Style
import './App.css';

const styles = theme => ({
  group: {
    padding: 16,
    textAlign: 'center',
  },
  form: {
    background: '#222',
    color: 'white',
    padding: 20,
    marginLeft: -20,
    marginTop: -20,
    borderBottomRightRadius: '25%'
  }
});

class Form extends Component {
  state = {
    taskName: '',
    taskDate: '',
    open: false
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.taskName, this.state.taskDate);
    this.setState({ taskName: '', taskDate: '', open: true })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.form}>
      <h2>New task</h2>
        <Grid container direction={'column'} alignItems={'center'} justify={'center'} spacing={24}>
          <Grid item xs>
            <form onSubmit={this.handleSubmit}>
              <label>Task:</label>
              <div className={classes.group}>
                <textarea rows="4" cols="25" value={this.state.taskName}
                  onChange={(event) => this.setState({ taskName: event.target.value })} placeholder="New Task" required />
              </div>
              <label>Date:</label>
              <div className={classes.group}>
                <input type="date" value={this.state.taskDate}
                  onChange={(event) => this.setState({ taskDate: event.target.value })} placeholder="Date" required />
              </div>
              <div className={classes.group}>
                <Button fab mini color="primary" aria-label="add" type="submit">
                  <AddIcon />
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.open}
          message="Task added to your list"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
Form.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Form);