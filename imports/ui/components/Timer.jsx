import React, { Component } from 'react';
import PropTypes from 'prop-types'

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
            dureeBoucle:  60,
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
            // console.log('debut timer')
            const idTimer = Meteor.setInterval(() => {Meteor.call('chapitres.timer.update', this.props.chapitre._id, this.props.chapitre.duree_boucle)}, 1000);
            Meteor.call('chapitres.timer.set', this.props.chapitre._id, idTimer)
            // var idTimer = Meteor.setInterval(() => {
            //     console.log('tentative set')
            // }, 10000);
            // console.log(idTimer)
            // Meteor.call('start.timer', this.props.chapitre._id)
            // lancerTimer(this.props.chapitre._id)
            this.setState({ timer: true })
        }
        

    }

    stopTimer() {
        Meteor.clearInterval(this.props.chapitre.id_timer)
        Meteor.call('chapitres.timer.reset', this.props.chapitre._id)
        // Meteor.call('stop.timer', this.props.chapitre._id, this.props.chapitre.id_timer)
        this.setState({ timer: false })
    }

    handleChange(event) {
        this.setState({duree_boucle: event.target.value});
        Meteor.call('chapitres.timer.duree', this.props.chapitre._id, this.state.dureeBoucle)
      }
    

    render() {
        return (
            <div className="timer">
                <h3>timer</h3>
                {/* {this.props.role == "editeur" && */}
                    <div className="timer">
                        <button className="start-timer" onClick={() => { this.startTimer(this.props.chapitre._id, 120) }}>Démarrer le timer</button>
                        <button className="start-timer" onClick={this.stopTimer}>Arreter le timer</button>
                        <label>Durée de transcription</label>
                        <input
                            type="number"
                            defaultValue={this.state.dureeBoucle}
                            name="transcripteurs"
                            min="1"
                            onChange={this.handleChange}
                        />
                    </div>
                {/* } */}
                <p>Temps restant : {this.props.chapitre.timer}</p>
            </div>
        )
    }
}