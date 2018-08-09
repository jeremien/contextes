import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Sessions } from '../../api/collections/sessions';
import IndexChapitre from './IndexChapitre';
import TableauDeBord from './TableauDeBord';

class DetailsSession extends React.Component {
    componentDidMount() {
        if (this.props.connecte) {
            Meteor.call('connexions.session', this.props.utilisateur, this.props.sessionId);
        }
    };

    componentWillUnmount() {
        Meteor.call('sessions.deconnexion', this.props.utilisateur);
    }

    render() {
        if (!this.props.loading && this.props.sessionExists) {
            return (
                <div className="details-session">
                    {(!!this.props.connecte && this.props.role == "editeur") ?
                        <TableauDeBord session={this.props.session} />
                        :
                        <h2>Choisir un chapitre à consulter</h2>
                    }
                    <br />
                    <br />
                    <IndexChapitre sessionId={this.props.session._id} />

                </div>
            )
        }
        else {
            return (
                <div className="details-session">
                    <h2>Choisir une session à afficher</h2>
                </div>
            );
        }
    }
}

export default withTracker((props) => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !sessionsHandle.ready();
    const session = Sessions.findOne({ _id: props.match.params.sessionId })
    const sessionExists = !loading && !!session
    return {
        loading,
        sessionExists,
        session: sessionExists ? session : []
    }
})(DetailsSession);
