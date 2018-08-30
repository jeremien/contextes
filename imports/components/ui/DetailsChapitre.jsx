import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'


import ConnexionsCourantes from '../outils/ConnexionsCourantes'


export default class DetailsChapitre extends Component {
    componentWillUnmount() {
        Meteor.call('connexions.offline', this.props.userId);
    };

    //Méthode à changer avec willMount/update selon l'endroit où sera définie la route
    componentDidMount() {
        if (this.props.connecte && this.props.chapitreExists) {
            Meteor.call('connexions.chapitre', this.props.userId, this.props.chapitre.session, this.props.chapitre._id);
        }
    };

    render() {
        if (this.props.loading) {
            return (
                <div className="details-chapitre">
                    <h3>Chargement en cours</h3>
                </div>
            )
        }

        if (this.props.chapitreExists) {

            //TODO : ajouter le titre de la session dans le detail du chapitre

            return (
                <div className="container-details-chapitre">
                    <div className='details-chapitre--gauche'>
                        <div className="infos-chapitre">
                            <Link to={`/sessions/${this.props.chapitre.session}`}>Retour à la session </Link>
                            {this.props.outils.outilgauche}
                            <ConnexionsCourantes {...this.props} />
                        </div>
                    </div>

                    <div className='details-chapitre--droit'>
                        <div className="documents">
                            {this.props.outils.outildroit}
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
}