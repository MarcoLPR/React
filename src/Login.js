import React, { Component } from 'react';
import Button from 'material-ui/Button';
import * as firebase from 'firebase';

class Login extends Component {
    state = {
      };
    logIn = () => {
        let logInInfo;
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            logInInfo = {
                user: user,
                photoURL: user.photoURL,
                username: user.displayName,
                email: user.email,
            }
        }).then(() => {
            this.sendLogged(logInInfo, true)
        })
    };
    logOut = (sendLogged) => {
        let logOutInfo;
        firebase.auth().signOut().then(function () {
            logOutInfo = {
                user: null,
                photoURL: '',
                username: '',
                email: '',
            }
        }).then(() => {
            this.sendLogged(logOutInfo, false)
        })
    };
    sendLogged = (logInfo, logged) => {
        this.props.onClick(logInfo, logged);
    }
    render() {
        return (
            <div>
                {this.props.logged ?
                    <Button raised color='primary' onClick={this.logOut}> Logout </Button>
                    : 
                    <Button raised color='primary' onClick={this.logIn}> Login </Button>
                }
            </div>
        );
    }
}


export default Login;