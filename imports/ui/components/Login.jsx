import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router,
    Route,
    Link,
    Redirect,
    withRouter,
    withHistory
  } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connecte: false
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target
        const nom = target.nom.value;
        const password = target.password.value;

        Meteor.loginWithPassword(nom, password);
        this.props.history.push('/');
    }
    
    render() {
        if (this.state.connecte) {
            return <Redirect to="/"/>
        }
        return (
            <form className="login" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="nom" placeholder="nom" />
                    <input type="text" name="password" placeholder="Mot de passe" />
                    <input type="submit" value="connexion" />
            </form>
            
        );
      }
}