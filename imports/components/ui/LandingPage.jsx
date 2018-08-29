import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
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
                <h1>DDR Contexte</h1>
                <p> introduction </p>
                <Link to="/sessions">Index des sessions</Link>
            </div>
        )
    }
}