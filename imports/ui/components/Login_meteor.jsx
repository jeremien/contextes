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
        // const role = target.role.value;

        Meteor.loginWithPassword(nom, password);
        localStorage.setItem("nom", nom);
        sessionStorage.setItem("nom", nom);
        this.props.history.push('/');
    }
    
    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="nom" placeholder="nom" />
                    <input type="text" name="password" placeholder="Mot de passe" />
                    <input type="submit" value="connexion" />
            </form>
            
        );
      }
}