import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

import { Chapitres } from '../../api/collections/chapitres'

import AjouterChapitre from '../outils/editeur/AjouterChapitre';

import InfosSessions from './InfosSession';

// TODO: bouton radio check 

class TableauDeBord extends React.Component {
    state = {
        etat: this.props.session.etat
    }

    handleEtat(event) {
        Meteor.call('sessions.etat.update', this.props.session._id, event.target.value)
    }

    render() {
        if (this.props.loading) {
            return (
                <h3>Chargement en cours</h3>
            )
        }

        else {
            return (
                <div className="infos--session">
                    <div className="mui--text-title">tableau de bord pour : {this.props.session.titre}</div>
                    
                    <div className="mui--text-subhead">Informations</div>

                    <InfosSessions session={this.props.session} />

                    <div className="mui--text-subhead">Etat de la session</div>
                    {/* <fieldset onChange={(event) => { console.log(event.target.value) }}> */}
                    <fieldset onChange={this.handleEtat.bind(this)}>
                        <div>
                            <input type="radio" defaultChecked={this.state.etat == "edition" ? "checked" : ""} value="edition" name="etat" />
                            <label>éditer</label>
                        </div>

                        <div>
                            <input type="radio" defaultChecked={this.state.etat == "completee" ? "checked" : ""} value="completee" name="etat" />
                            <label>compléter</label>
                        </div>

                        <div>
                            <input type="radio" defaultChecked={this.state.etat == "archivee" ? "checked" : ""} value="archivee" name="etat" />
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