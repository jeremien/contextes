import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';

export default class AjouterDocument extends Component {

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const commentaire = target.contentInput.value;
        // const auteur = Session.get('utilisateur');
        const auteur = this.props.utilisateur;
        const session = this.props.chapitre.session;
        const chapitre = this.props.chapitre._id;

        // console.log(commentaire, auteur, session, chapitre)

        Meteor.call('documents.insert', session, chapitre, commentaire, auteur)

        target.reset();
    }

    render() {
        // console.log('ajouter doc')
        // console.log(this.props);
        
        return (
            <div className="ajout-commentaire">
                <form className="nouveau-commentaire" onSubmit={this.handleSubmit.bind(this)} >
                    <textarea
                        rows="4"
                        cols="50"
                        name="contentInput"
                        placeholder="Entrer le nouveau commentaire"
                    />
                    <br />
                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
        )
    }
}