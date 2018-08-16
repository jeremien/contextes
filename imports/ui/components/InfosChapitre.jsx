import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import Timer from './Timer'

/**
 * Permet l'affichage des méta-data et propriétés d'un chapitre.
 * Le chapitre en question doit être passé directement en props
 */
export default class InfosChapitre extends Component {
    static propTypes = {
        chapitre: PropTypes.object.isRequired,
    };

    static defaultProps = {
        chapitre: {},
    };

    render() {
        return (
            <div className="infos-chapitre">
                <h3 className="titre">Chapitre : {this.props.chapitre.titre}</h3>
                <p>{this.props.chapitre.description}</p>
                
                <ul className="online">
                {this.props.connexions.map((connexion) => (
                    <li key={connexion._id}>Utilisateur : {connexion.utilisateur}</li>
                ))}
                </ul>
                <Timer {...this.props} />
                <p>Temps restant : {this.props.chapitre.timer}</p>

            </div>
        )
    }
}