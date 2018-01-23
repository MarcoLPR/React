//React
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
//Components
import ToDoApp from './ToDoApp.js';
import ToDoBar from './ToDoBar.js';
//Material-UI
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { teal, amber } from 'material-ui/colors';
//Firebase
import * as firebase from 'firebase';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
    secondary: amber,
  },
});
const config = {
  apiKey: "AIzaSyCUJ99TCZIXDZIT0OnGUSNM5g-HojrFQec",
  authDomain: "to-do-list-17ded.firebaseapp.com",
  databaseURL: "https://to-do-list-17ded.firebaseio.com",
  projectId: "to-do-list-17ded",
  storageBucket: "",
  messagingSenderId: "496941037420"
};
firebase.initializeApp(config);

class App extends Component {
  state = {
    user: {
      user: null,
      photoURL: '',
      username: '',
      email: ''
    },
    tasksInfo: [],
    logged: false,
  };

  handleLog = (logInfo, logged) => {
    var info = {
      activeTasks: [],
      favoriteTasks: [],
      completedTasks: [],
      taskCount: 0,
      unfinishedTasks: 0,
      completeTaskCount: 0,
      favoriteCount: 0,
    };
    this.setState({ user: logInfo });
    this.setState({ logged: logged });
      firebase.database().ref('users/' + logInfo.username + '/active/').on('child_added', data => {
        var task = data.val();
        info.activeTasks.push(task);
      })
      firebase.database().ref('users/' + logInfo.username + '/favorite/').on('child_added', data => {
        var task = data.val();
        info.favoriteTasks.push(task);
      })
      firebase.database().ref('users/' + logInfo.username + '/completed/').on('child_added', data => {
        var task = data.val();
        info.completedTasks.push(task);
      })
        this.setState({ tasksInfo: info })
  };
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <ToDoBar logged={this.state.logged} onClick={this.handleLog} photoURL={this.state.user.photoURL} />
            <ToDoApp logged={this.state.logged} user={this.state.user} tasksInfo={this.state.tasksInfo}/>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;