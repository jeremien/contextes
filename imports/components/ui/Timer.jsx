import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Connexions } from '../../api/collections/connexions'

/**
 * Gère l'état du timer du chapitre donné en props
 */
class Timer extends Component {
    constructor(props) {
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            timer: false,
            dureeBoucle: this.props.chapitre.duree_boucle,
        }
    }

    componentDidUpdate() {
        Meteor.call('timer.listeTranscripteurs', this.props.connexions)
    }

    /**
     * Appele de la méthode d'update du timer automatique.
     * Appelée ici toutes les secondes (1000 millisecondes)
     * L'id de setIntervalle est stocké dans le state "timer" pour pouvori être arrêté ensuite
     */
    startTimer() {

        if (!this.state.timer) {
            Meteor.call('timer.start', this.props.chapitre)
            this.setState({ timer: true })

            let infos = {
                title : "message de l'éditeur",
                message : "lancement de la transcription",
                type : "warning"
            }

            Meteor.call('notification', infos);
        }
    }

    stopTimer() {
        Meteor.call('timer.stop', this.props.chapitre)
        this.setState({ timer: false })

        let infos = {
            title : "message de l'éditeur",
            message : "arrêt de la transcription",
            type : "warning"
        }

        Meteor.call('notification', infos);
    }

    //Memo bug : la durée enregistrée est différente d'une seconde.
    handleChange(event) {
        Meteor.call('chapitres.timer.duree', this.props.chapitre._id, event.target.value)
        if (this.state.timer) {
            Meteor.call('timer.stop', this.props.chapitre)
            Meteor.call('timer.start', this.props.chapitre)
        }
        this.setState({ dureeBoucle: event.target.value });

    }

    render() {
        return (
            <div className="timer">

                {this.props.role == "editeur" &&
                    <div className="timer">
                        <h3>timer</h3>
                        <button className="start-timer" onClick={() => { this.startTimer(this.props.chapitre._id) }}>Démarrer le timer</button>
                        <button className="start-timer" onClick={this.stopTimer}>Arreter le timer</button>
                        <input
                            type="number"
                            value={this.state.dureeBoucle}
                            name="transcripteurs"
                            min="1"
                            onChange={this.handleChange}
                        />
                        <br />
                        <time>{this.props.chapitre.timer}</time>
                        <br />

                    </div>
                }
            </div>
        )
    }
}

export default withTracker((props) => {
    const connexionsHandle = Meteor.subscribe('connexions')
    const loading = !connexionsHandle.ready(); //vaut true si les données ne sont pas encore chargées.
    var connexions = Connexions.find(
        {
            chapitre: props.chapitre._id,
            role: 'transcripteur',
            online: true,
        },
    );
    const connexionsExists = !loading && !!connexions;
    return ({
        loading,
        connexionsExists,
        connexions: connexionsExists ? connexions.fetch() : [{}],
    })
})(Timer);
