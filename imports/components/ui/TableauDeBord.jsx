import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

import { Chapitres } from '../../api/collections/chapitres'

import AjouterChapitre from '../outils/AjouterChapitre';

class TableauDeBord extends React.Component {
    state = {
        etat: this.props.session.etat,
    }



    handleEtat(event, etat) {
        event.preventDefault();
        console.log(event.target.value)
        // this.setState({etat: etat});
        // Meteor.call('session.etat.update', this.props.session._id, etat)
    }

    render() {
        if (this.props.loading) {
            return (
                <h3>Chargement en cours</h3>
            )
        }

        else {
            return (
                <div className="tableau-de-bord">
                    <h2>{this.props.session.titre} : tableau de bord</h2>
                    <h3>Etat de la session</h3>
                    <fieldset onChange={(event) => { console.log(event.target.value) }}>
                        <div>
                            <input type="radio" value="edition" name="etat" />
                            <label>en cours d'édition</label>
                        </div>

                        <div>
                            <input type="radio" value="completee" name="etat" />
                            <label>compléter</label>
                        </div>

                        <div>
                            <input type="radio" value="archive" name="etat" />
                            <label>archiver</label>
                        </div>

                    </fieldset>
                    <h3>Rôles autorisés :</h3>
                    <ul>
                        {Object.entries(this.props.session.roles).map(([role, nombre]) => (
                            <li key={role}>{role} : {nombre}</li>
                        ))}
                    </ul>
                    <AjouterChapitre sessionId={this.props.session._id} />
                </div>
            )
        }
    }
}

export default TableauDeBordContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !chapitresHandle.ready()
    const chapitres = Chapitres.find({ session: props.session._id }).fetch();
    const chapitresExists = !loading && !!chapitres;
    return {
        loading,
        chapitresExists,
        chapitres: chapitresExists ? chapitres : [],
    }
})(TableauDeBord);