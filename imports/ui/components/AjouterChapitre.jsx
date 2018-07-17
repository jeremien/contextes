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
        const duree = target.duree.value;
        Meteor.call('chapitres.insert', session, titre, auteur, duree)

        target.reset();
    }

    render() {
        return (
            <div className="ajout-chapitre">
                <h2>Ajouter un chapitre</h2>
                <form className="nouveau-chapitre" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                        type="text"
                        name="titre"
                        placeholder="Titre du chapitre"
                    />
                    <label>Durée du chapitre en minutes</label>
                        <input
                            type="number"
                            name="duree"
                            placeholder="1"
                            min="1"
                        />
                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
        )
    }
}