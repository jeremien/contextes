import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

/**
 * Permet l'affichage des méta-data et propriétés d'un chapitre.
 * Le chapitre en question doit être passé directement en props
 */
export default class InfosChapitre extends Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    render() {
        return (
            <div>
                <h1>Landing page</h1>
                <Link to="/sessions">Index des sessions</Link>
            </div>
        )
    }
}