import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AjouterCommentaire extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const commentaire = target.contentInput.value;
        const auteur = Meteor.user().username;
        const session = this.props.session;
        const chapitre = this.props.chapitre;
        Meteor.call('commentaires.insert', session, chapitre, commentaire, auteur)

        target.contentInput.value = "";
        target.auteurInput.value = "";
    }
    
    render() {
        return(
        <div className="ajout-commentaire">
            <form className="nouveau-commentaire" onSubmit={this.handleSubmit.bind(this)} >
            <input
                type="text"
                name="contentInput"
                placeholder="Entrer le nouveau commentaire"
            />
            <input
                type="text"
                name="auteurInput"
                placeholder="Auteur"
            />
            <input type="submit" value="Enregistrer" />
            </form>
        </div>
        )
    }
}