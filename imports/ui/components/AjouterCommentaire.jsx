import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AjouterCommentaire extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const commentaire = target.contentInput.value;
        const auteur = Session.get('utilisateur');
        const session = this.props.sessionId;
        const chapitre = this.props.chapitreId;
        Meteor.call('commentaires.insert', session, chapitre, commentaire, auteur)

        target.reset();
    }

    render() {
        return (
            <div className="ajout-commentaire">
                <form className="nouveau-commentaire" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                        type="text"
                        name="contentInput"
                        placeholder="Entrer le nouveau commentaire"
                    />
                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
        )
    }
}