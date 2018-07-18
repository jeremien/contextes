import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Router,
    Route,
    Link,
    Redirect,
    withRouter,
    withHistory
  } from "react-router-dom";

  import { Connexions } from '../../api/collections/connexions';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {role: Session.get('role') || 'transcripteur'};
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target
        const nom = target.nom.value;
        // localStorage.setItem("nom", nom);
        Session.set('utilisateur', nom),
        Session.set('role', this.state.role),
        Session.set('connecte', true),
        //AJouter envoie du socket
        Meteor.call('connexions.insert', nom, this.state.role);
        this.props.history.push('/');
    }
    handleChange(event) {
        this.setState({role: event.target.value});
      }
    
    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="nom" placeholder="nom" />
                    <select  value={this.state.role} onChange={this.handleChange.bind(this)}>
                        <option value="transcripteur">Transcripteur</option>
                        <option value="correcteur">Correcteur</option>
                        <option value="conformateur">Conformateur</option>
                        <option value="editeur">Editeur</option>
                    </select>
                    <input type="submit" value="connexion" />
            </form>
            
        );
      }
}