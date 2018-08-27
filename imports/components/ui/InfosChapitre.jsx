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
        // console.log(this.props)
        // console.log('outils gauche');
        return (
            <div className="infos-chapitre">
                <h3 className="titre">Chapitre : {this.props.chapitre.titre}</h3>
                <p>description : {this.props.chapitre.description}</p>

                <p>nombre de documents : </p>
                <p>nombre de documents corrigés : </p>
                <p>tags à utiliser : </p>


                {!!this.props.connecte && this.props.role === "editeur" || this.props.role === "transcripteur" ? <p>Temps de transcription restant : {this.props.chapitre.timer}</p> : undefined}

                <Timer {...this.props} />

            </div>
        )
    }
}