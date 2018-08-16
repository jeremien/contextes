import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import DetailsSession from './DetailsSession'

export default class IndexSessions extends Component {
    state = {
        toggleSession: false,
    }

    static propTypes = {
        sessions: PropTypes.array.isRequired,
        connecte: PropTypes.bool.isRequired,
        role: PropTypes.string.isRequired,
        utilisateur: PropTypes.string.isRequired,
        socketId: PropTypes.string.isRequired,
    };

    static defaultProps = {
        sessions: [{}],
    };

    renderSesssions() {
        let sessionsFiltrees = this.props.sessions;
        console.log(sessionsFiltrees)
        if (this.state.toggleSession) {
            sessionsFiltrees = sessionsFiltrees.filter((session) => { return (session.etat == "archivee") })
        }
        else {
            sessionsFiltrees = sessionsFiltrees.filter((session) => { return !(session.etat == "archivee") })
        }
        console.log(sessionsFiltrees)
        return sessionsFiltrees.map((session) => (
            <div key={session._id}>
                <Link to={`/sessions/${session._id}`}>
                    {session.titre}
                </Link>
                ({session.etat})
                <button onClick={() => Meteor.call('sessions.remove', session._id)}>Supprimer la session</button>
                <br />
            </div>
        ))
    }

    handleChange(event) {
        event.preventDefault();
        console.log(event.target)
        const prevState = this.state.toggleSession;
        this.setState({ toggleSession: !prevState })
    }
    render() {
        //Conflit avec les props passées par la route sans déconstruction. Trouver une solution plus propre
        var { match, path, ...rest } = this.props
        return (
            <div className="index-sessions">
                <div className="index-sessions-gauche">
                    <div className="action-session">
                        {this.props.action}
                    </div>
                    <hr />
                    <div className="liste-sessions">
                        <label className="hide-archivee">
                            <input type="checkbox" value={this.state.toggleSession} readOnly onClick={this.handleChange.bind(this)} />
                            Afficher les sessions archivées {this.state.toggleSession}
                        </label>
                        {/* <label className="hide-archivee">
                            <input
                                type="checkbox"
                                readOnly
                                checked={this.state.hideCompleted}
                                onClick={this.toggleHideCompleted.bind(this)}
                            /> */}
                        {this.renderSesssions()}
                    </div>
                </div>
                <hr />
                <div className="index-sessions-droite">
                    <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...rest} />} />
                </div>
            </div>
        )
    }
};