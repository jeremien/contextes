import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export default class AjouterChapitre extends Component {
    state = { description: '', tags: [], tagCourant: "" }

    handleChange(event) {
        this.setState({ description: event.target.value })
    }

    handleTags(event) {
        if (event.target.value.slice(-1) == " ") {
            var prevTag = this.state.tags;
            prevTag.push(this.state.tagCourant);
            this.setState({ tags: prevTag, tagCourant: "" });
        }
        else {
            this.setState({ tagCourant: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const auteur = Session.get('utilisateur');
        const titre = target.titre.value;
        const session = this.props.sessionId;
        const duree = target.duree.value || 1;

        if (titre && this.state.description) {
            Meteor.call('chapitres.insert', session, titre, auteur, this.state.value, duree, this.state.tags)
            target.reset();
            this.setState({ tags: [], tagCourant: "" })
        }
        else {
            alert('Remplissez tous les champs')
        }
    }

    render() {
        return (
            <div className="ajout-chapitre">
                <h3>Ajouter un chapitre</h3>
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
                        placeholder="Une bref description du chapitre"
                        value={this.state.description}
                        onChange={this.handleChange.bind(this)}
                    >
                    </textarea>
                    <br />
                    <label>Durée des boucles en minutes</label>
                    <input
                        type="number"
                        name="duree"
                        defaultValue="60"
                        min="1"
                    />
                    <br />
                    <label>Choix des tags possibles pour les documents</label>
                    <input
                        type="text"
                        name="tag"
                        value={this.state.tagCourant}
                        onChange={this.handleTags.bind(this)}
                    />
                    <ul>Tags actuels
                             {Object.entries(this.state.tags).map(([key, tag]) => (
                            <li key={key}>{tag}</li>
                        ))}
                    </ul>
                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
        )
    }
}