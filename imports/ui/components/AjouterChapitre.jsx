import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AjouterChapitre extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const auteur = Meteor.user().username;
        const titre = traget.titre.value;
        const session = this.props.session;
        Meteor.call('commentaires.insert', session, titre, auteur)

        target.reset();
    }
    
    render() {
        return(
        <div className="ajout-titre">
            <form className="nouveau-commentaire" onSubmit={this.handleSubmit.bind(this)} >
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