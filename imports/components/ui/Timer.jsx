import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { Jobs } from 'meteor/msavin:sjobs'


// import '/server/timer'

// import lancerTimer from './apiTimer'

/**
 * Gère l'état du timer du chapitre donné en props
 */
export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            timer: false,
            dureeBoucle: this.props.chapitre.duree_boucle,
            transcripteur: 0,
        }
    }

    static propTypes = {
        chapitre: PropTypes.object.isRequired,
    };

    static defaultProps = {
        chapitre: {},
    };

    /**
     * Appele de la méthode d'update du timer automatique.
     * Appelée ici toutes les secondes (1000 millisecondes)
     * L'id de setIntervalle est stocké dans le state "timer" pour pouvori être arrêté ensuite
     */
    startTimer() {
        if (!this.state.timer) {
            // const idTimer = this.props.cron.setInterval(Meteor.call('chapitres.timer.update', this.props.chapitre._id, this.props.chapitre.duree_boucle), 1000, 'startTimer')
            // Meteor.call('chapitres.timer.set', this.props.chapitre._id, idTimer)
            Meteor.call('timer.start', this.props.chapitre)
            // Jobs.run("startTimer", this.props.chapitre);
            this.setState({ timer: true })
        }


    }

    stopTimer() {
        // Meteor.call('stop.timer', this.props.chapitre._id, this.props.chapitre.id_timer)
        Meteor.call('timer.stop', this.props.chapitre)
        this.setState({ timer: false })
    }

    //Memo bug : la durée enregistrée est différente d'une seconde.
    handleChange(event) {
        this.setState({ dureeBoucle: event.target.value });
        Meteor.call('chapitres.timer.duree', this.props.chapitre._id, event.target.value)
        if (this.state.timer) {
            Meteor.clearInterval(this.props.chapitre.id_timer)
            const idTimer = Meteor.setInterval(() => { Meteor.call('chapitres.timer.update', this.props.chapitre._id, this.props.chapitre.duree_boucle) }, 1000);
            Meteor.call('chapitres.timer.set', this.props.chapitre._id, idTimer)
        }
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
                {/* {this.props.role == "transcripteur" &&
                    <div>
                        <p>{this.props.chapitre.timer}</p>
                    </div>
                } */}
            </div>
        )
    }
}