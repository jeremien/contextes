import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';

export default class AjouterDocument extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const commentaire = target.contentInput.value;
        const auteur = Session.get('utilisateur');
        const session = this.props.session;
        const chapitre = this.props.chapitre._id;
        Meteor.call('documents.insert', session, chapitre, commentaire, auteur)

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
                    <br />
                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
        )
    }
}