import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

/**
 * Component gérant la création de session.
 * Le formulaire a une className "nouvelle-session".
 * L'affichage est contenu dans une div "ajout-session".
 */
class AjouterSession extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const titre = target.titre.value;
        const auteur = Session.get('utilisateur') || inconnu;

        Meteor.call('sessions.insert', titre, auteur)
        target.reset()
    }
    
    render() {
        return(
        <div className="ajout-session">
            <form className="nouvelle-session" onSubmit={this.handleSubmit.bind(this)} >
            <input
                type="text"
                name="titre"
                placeholder="Entrer le titre de la session"
            />
            <input type="submit" value="Enregistrer" />
            </form>
        </div>
        )
    }
}

export default AjouterSession;
