import React, { Component } from 'react';
import PropTypes from 'prop-types'

/**
 * Gère l'état du timer du chapitre donné en props
 */
export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this)
        this.state = {
            timer: false,
        }
    }

    static propTypes = {
        chapitre: PropTypes.object.isRequired,
    };

    static defaultProps = {
        chapitreId: {},
    };

    /**
     * Appele de la méthode d'update du timer automatique.
     * Appelée ici toutes les secondes (1000 millisecondes)
     * L'id de setIntervalle est stocké dans le state "timer" pour pouvori être arrêté ensuite
     */
    startTimer(chapitreId, tempsTimer) {
        if (!this.state.timer) {
            Session.set('timerId', Meteor.setInterval(function () {
                Meteor.call('chapitres.timer.update', chapitreId, tempsTimer)
            }, 1000));
            Meteor.setTimeout(function () { Meteor.clearInterval(Session.get('timerId')) }, this.props.chapitre.duree_chapitre * 60 * 1000);
            this.setState({ timer: true })
        }

    }

    stopTimer() {
        Meteor.clearInterval(Session.get('timerId'))
        Meteor.call('chapitres.timer.reset', this.props.chapitre._id)
        this.setState({ timer: false })
    }

    render() {
        return (
            <div className="timer">
                <h3>timer</h3>
                {this.props.role == "editeur" &&
                    <div className="timer">
                        <button className="start-timer" onClick={() => { this.startTimer(this.props.chapitre._id, 120) }}>Démarrer le timer</button>
                        <button className="start-timer" onClick={this.stopTimer}>Arreter le timer</button>
                    </div>
                }
                <p>Temps restant : {this.props.chapitre.timer}</p>
            </div>
        )
    }
}