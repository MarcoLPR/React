import React from 'react';
import './App.css';

const ToDoList = (props) => {
    return (
      <div className="ToDoList">
        {props.tasks.map(task => <Task taskName = {task.taskName} taskId = {task.taskId} onSubmit = {props.onSubmit}/>)}
      </div>
    );
  }
const Task = (props) => {
    this.handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(props.taskId);
    }
        return (
            <div className="Task">
                <form onSubmit={this.handleSubmit}>
                    <div>{props.taskId}</div>
                    <div>{props.taskName}</div>
                    <button type="submit">X</button>
                </form>
            </div>
        );
    }
export default ToDoList;
