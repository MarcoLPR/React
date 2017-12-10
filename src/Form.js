import React, { Component } from 'react';
import './App.css';

class Form extends Component {
    state= {taskName: ''}
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.taskName);
        this.setState({taskName: ''})
    }
  render() {
    return (
      <div className="Form">
        <h2>To Do List</h2>
        <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.taskName}
             onChange={(event) => this.setState({ taskName: event.target.value})} placeholder="New Task" required/>
            <button type="submit">ADD</button>
        </form>
      </div>
    );
  }
}

export default Form;