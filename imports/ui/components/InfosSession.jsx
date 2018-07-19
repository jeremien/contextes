import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

/**
 * Permet l'affichage des méta-data et propriétés d'une session.
 * La session en question doit être passée directement en props
 */
export default class InfosSession extends Component {
    static propTypes = {
        session: PropTypes.isRequired,
    };

    static defaultProps = {
        session: {},
    };

    render() {
        return (
            <div>
                <h3>Une session détaillé</h3>
            </div>
        )
    }
}