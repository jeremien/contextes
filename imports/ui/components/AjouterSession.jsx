import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';


/**
 * Component gérant la création de session.
 */
class AjouterSession extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const titre = target.titre.value;
        const auteur = Session.get('utilisateur') || inconnu;
        const roles = {
            transcripteurs: target.transcripteurs.value,
            correcteurs: target.correcteurs.value,
            conformateurs: target.conformateurs.value,
        };

        Meteor.call('sessions.insert', titre, auteur, roles)
        target.reset()
        this.props.history.push('/')
    }

    render() {
        if (!!Session.get('connecte')) {
            return (
                <div className="ajout-session">
                    <form className="nouvelle-session" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            name="titre"
                            placeholder="Entrer le titre de la session"
                        />
                        <label>Nombre de transcripteurs</label>
                        <input
                            type="number"
                            name="transcripteurs"
                            placeholder="1"
                            min="1"
                        />
                        <label>Nombre de correcteurs</label>
                        <input
                            type="number"
                            name="correcteurs"
                            placeholder="1"
                            min="1"
                        />
                        <label>Nombre de conformateurs</label>
                        <input
                            type="number"
                            name="conformateurs"
                            placeholder="Nombre de conformateurs"
                            min="1"
                        />
                        <input type="submit" value="Enregistrer" />
                    </form>
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
