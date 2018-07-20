import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import { Sessions } from '../../api/collections/sessions';
import DetailsSession from './DetailsSession'

class IndexSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session_active: null,
        }
        this.getAction = this.getAction.bind(this);
    }

    static propTypes = {
        sessions: PropTypes.array.isRequired,
    };

    static defaultProps = {
        sessions: [{}],
    };

    render() {
        return (
            <div className="index-sessions">
                <div className="index-sessions-gauche">
                    <div className="action-session">
                        {this.getAction()}
                    </div>
                    <div className="liste-sessions">
                        {this.props.sessions.map((session) => (
                            <li key={session._id} onClick={() => this.setState({ session_active: session._id })}>
                                {session.titre}
                                <button onClick={() => Meteor.call('sessions.remove', session._id)}>Supprimer la session</button>
                                <br />
                            </li>
                        ))}
                    </div>
                </div>
                <div className="index-sessions-droite">
                    <DetailsSession sessionId={this.state.session_active} {...this.props} />
                </div>
            </div>
        )
    }
};

export default IndexSessionContainer = withTracker(() => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !sessionsHandle.ready();
    const sessions = Sessions.find({}).fetch();
    const sessionsExists = !loading && !!sessions;
    return {
        loading,
        sessionsExists,
        sessions: sessionsExists ? sessions : []
    }
})(IndexSessions);