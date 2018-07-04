import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export default class AjouterChapitre extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const auteur = Session.get('utilisateur');
        const titre = target.titre.value;
        const session = this.props.session;
        Meteor.call('chapitres.insert', session, titre, auteur)

        target.reset();
    }
    
    render() {
        return(
        <div className="ajout-titre">
            <form className="nouveau-chapitre" onSubmit={this.handleSubmit.bind(this)} >
            <input
                type="text"
                name="titre"
                placeholder="Titre du chapitre"
            />
            <input type="submit" value="Enregistrer" />
            </form>
        </div>
        )
    }
}