import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';


/**
 * Component gérant la création de session.
 */
class AjouterSession extends Component {
    state = { value: '' }

    static propTypes = {
        utilisateur: PropTypes.string.isRequired,
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const titre = target.titre.value;
        const auteur = this.props.utilisateur || inconnu;
        const roles = {
            transcripteurs: target.transcripteurs.value,
            correcteurs: target.correcteurs.value,
            conformateurs: target.conformateurs.value,
        };

        Meteor.call('sessions.insert', titre, auteur, this.state.value, roles)
        target.reset()
    }

    render() {
        if (!!Session.get('connecte')) {
            return (
                <div className="ajout-session">
                <h2>Création d'une session</h2>
                <br />
                    <form className="nouvelle-session" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            name="titre"
                            placeholder="Entrer le titre de la session"
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
                        <label>Nombre de transcripteurs</label>
                        <input
                            type="number"
                            defaultValue="1"
                            name="transcripteurs"
                            placeholder="1"
                            min="1"
                        />
                        <br />
                        <label>Nombre de correcteurs</label>
                        <input
                            type="number"
                            defaultValue="1"
                            name="correcteurs"
                            placeholder="1"
                            min="1"
                        />
                        <br />
                        <label>Nombre de conformateurs</label>
                        <input
                            type="number"
                            defaultValue="1"
                            name="conformateurs"
                            min="1"
                        />
                        <br />
                        <input type="submit" value="Enregistrer" />
                    </form>
                    <br />
                </div>
            )
        }
        else {
            return (
                <h1>Vous devez être connecté.e</h1>
            )
        }
    }
}

export default AjouterSession;
