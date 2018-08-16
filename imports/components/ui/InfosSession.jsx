import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'
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