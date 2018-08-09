import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

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
        console.log(this.props.role)
        return (
            <div className="infos-chapitre">
                <h3 className="titre">Chapitre : {this.props.chapitre.titre}</h3>
                <p>{this.props.chapitre.description}</p>
                
                <ul className="online">
                </ul>
                <Timer {...this.props} />
                <p>Temps restant : {this.props.chapitre.timer}</p>

            </div>
        )
    }
}