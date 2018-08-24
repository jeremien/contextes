import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import ConnexionsCourantesContainer from '../data/ConnexionsCourantesContainer';


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

        //TODO : ajouter le titre de la session dans le detail du chapitre

        return (
            <div className="container-details-chapitre">

            
                <div className='details-chapitre--gauche'>
                    <div className="infos-chapitre">
                        <Link to={`/sessions/${props.chapitre.session}`}>Retour à la session </Link>
                        {props.outils.outilgauche}
                        <ConnexionsCourantesContainer {...props} />
                    </div>            
                </div>
          
                <div className='details-chapitre--droit'>
                    <div className="documents">
                        {props.outils.outildroit}
                    </div>
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