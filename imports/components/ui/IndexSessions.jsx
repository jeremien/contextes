import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

import DetailsSession from './DetailsSession'

export default class IndexSessions extends Component {
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

    render() {
        //Conflit avec les props passées par la route sans déconstruction. Trouver une solution plus propre
        var {match, path, ...rest} = this.props
        return (
            <div className="index-sessions">
                <div className="index-sessions-gauche">
                    <div className="action-session">
                        {this.props.action}
                    </div>
                    <hr />
                    <div className="liste-sessions">
                        {this.props.sessions.map((session) => (
                            <div key={session._id}>
                                <Link to={`/sessions/${session._id}`}>
                                    {session.titre}
                                </Link>
                                <button onClick={() => Meteor.call('sessions.remove', session._id)}>Supprimer la session</button>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <div className="index-sessions-droite">
                    <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...rest} /> } />
                </div>
            </div>
        )
    }
};