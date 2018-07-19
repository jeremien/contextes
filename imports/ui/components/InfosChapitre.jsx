import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

/**
 * Permet l'affichage des méta-data et propriétés d'un chapitre.
 * Le chapitre en question doit être passé directement en props
 */
export default class InfosChapitre extends Component {
    static propTypes = {
        chapitre: PropTypes.isRequired,
    };

    static defaultProps = {
        chapitre: {},
    };

    render() {
        return (
            <div>
                <h3>Un chapitre détaillé</h3>
            </div>
        )
    }
}