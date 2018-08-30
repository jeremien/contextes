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
        // console.log(sessionsFiltrees)
        if (this.state.toggleSession) {
            sessionsFiltrees = sessionsFiltrees.filter((session) => { return (session.etat == "archivee") })
        }
        else {
            sessionsFiltrees = sessionsFiltrees.filter((session) => { return !(session.etat == "archivee") })
        }
        // console.log(sessionsFiltrees)
        return sessionsFiltrees.map((session, key) => (
            <div key={key}>
                <Link to={`/sessions/${session._id}`}>
                    {session.titre}
                </Link>

                ({session.etat})

                {!!this.props.connecte && this.props.role === "editeur" ? <button onClick={() => Meteor.call('sessions.remove', session._id)}>Supprimer la session</button> : undefined}

                <br />
            </div>
        ))
    }

    handleChange(event) {
        // console.log(event.target)
        const prevState = this.state.toggleSession;
        this.setState({ toggleSession: event.target.checked })
    }
    render() {
        // console.log(this.props.role);
        //Conflit avec les props passées par la route sans déconstruction. Trouver une solution plus propre
        var { match, path, ...rest } = this.props
        return (
            <div className="container-index-session">
                <div className="index-session-gauche">

                    <div className="action-session">
                        {this.props.action}
                    </div>

                    <div className="liste-sessions">
                        <h1>liste des sessions</h1>
                        <label className="hide-archivee">
                            <input
                                name="archive"
                                type="checkbox"
                                checked={this.state.toggleSession}
                                onChange={this.handleChange.bind(this)}
                            />
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

                <div className="index-session-droit">
                    <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...rest} />} />
                </div>
            </div>
        )
    }
};