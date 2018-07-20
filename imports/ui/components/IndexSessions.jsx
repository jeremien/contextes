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
    }

    static propTypes = {
        sessions: PropTypes.isRequired,
    };

    static defaultProps = {
        sessions: [{}],
    };

    // render() {
    //     return (
    //         <div>
    //             <h2>Sessions</h2>
    //             <ul>
    //                 {this.props.sessions.map((session) => (
    //                     <li key={session._id}>
    //                         <Link to={`/session/${session._id}`}>
    //                             {session.titre}
    //                         </Link>
    //                         <button onClick={() => Meteor.call('sessions.remove', session._id)}>Supprimer la session</button>
    //                         <br />
    //                     </li>
    //                 ))}
    //             </ul>
    //             {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
    //                 <Link to="/session/creer">Ajouter une session</Link>
    //             }
    //         </div>
    //     )
    // }

    // sessionSelection(event, sessionId) {
    //     event.preventDefault();
    //     this.setState('session)
    // }

    render() {
        return (
            <div className="index-sessions">
                <div className="index-sessions-gauche">
                    <div className="action-session">

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