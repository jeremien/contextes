import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AjouterSession extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const titre = target.contentInput.value;
        const auteur = target.titreInput.value;
        if (session == "") {
            
        }
        Meteor.call('sessions.insert', titre, auteur)

        target.contentInput.value = "";
        target.auteurInput.value = "";
    }
    
    render() {
        return(
        <div className="ajout-session">
            <form className="nouvelle-session" onSubmit={this.handleSubmit.bind(this)} >
            <input
                type="text"
                name="titreInput"
                placeholder="Entrer le titre de la session"
            />
            <input
                type="text"
                name="auteurInput"
                placeholder="Entrer le titre de la session"
            />
            <input type="submit" value="Enregistrer" />
            </form>
        </div>
        )
    }
}