import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import ConnexionsCourantesContainer from '../data/ConnexionsCourantesContainer';

//TODO : ajouter le titre de la session dans le detail du chapitre

export default function DetailsChapitre(props) {
    // console.log(props)
    if (props.loading) {
        return (
            <div className="details-chapitre">
                <h3>Chargement en cours</h3>
            </div>
        )
    }

    if (props.chapitreExists) {
        return (
            <div className="details-chapitre">
            <Link to={`/sessions/${props.chapitre.session}`}>Retour à la session </Link>
                <div className="infos-chapitre">
                    <p>outils gauche</p>
                    {props.outils.outilgauche}
                    <ConnexionsCourantesContainer {...props} />
                </div>
                <div className="documents">
                    <p>outils droits</p>
                    {props.outils.outildroit}
                </div>

            </div>
        )
    }

    return (
        <div className="details-chapitre">
            <h3>Choisir un chapitre</h3>
        </div>
    )
}