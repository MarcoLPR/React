import React, { Component } from 'react';
import './App.css';
import App from './App.js'

class ToDo extends Component {
deleteTask = (taskId) => {
    for(var i=0; i<App.tasks.length; i++)
        if(App.tasks[i].taskId === taskId){
            App.tasks.splice(i, 1)
        }
    }
    render() {
        return null
    }
};
const ToDoList = (props) => {
    return (
      <div className="ToDoList">
        {props.tasks.map(task => <Task taskName = {task.taskName} taskId = {task.taskId} />)}
      </div>
    );
  }
const Task = (props) => {
        return (
            <div className="Task">
                <div>{props.taskName}</div>
                <button onClick={this.deleteTask}>X</button>
            </div>
        );
    }
export default ToDoList;
