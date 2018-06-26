import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

export default class Inscriptiion extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target
        const nom = target.nom.value;
        const password = target.password.value;

        const user = {
            username: nom,
        }

        Accounts.createUser(user, function(err) {
            if(err) {
                alert(err.reason)
            }
            else {
                    return <Redirect to={{pathname: "home"}} />
            }
        })
    }
    
    render() {
        return (
            <form className="inscription" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="nom" placeholder="nom" />
                    <input type="password" name="password" placeholder="Mot de passe" />
                    <input type="submit" value="inscription" />
            </form>
            
        );
      }
}