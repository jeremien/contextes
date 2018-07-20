import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export default class AjouterChapitre extends Component {
    state = { value: '' }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const auteur = Session.get('utilisateur');
        const titre = target.titre.value;
        const session = this.props.sessionId;
        const duree = target.duree.value || 1;

        Meteor.call('chapitres.insert', session, titre, auteur, this.state.value, duree)

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
                    <br />
                    <textarea
                        rows="4"
                        cols="50"
                        form="ajout-session"
                        placeholder="Une bref description de la session"
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    >
                    </textarea>
                    <br />
                    <label>Durée du chapitre en minutes</label>
                    <input
                        type="number"
                        name="duree"
                        placeholder="1"
                        min="1"
                    />
                    <br />
                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
        )
    }
}