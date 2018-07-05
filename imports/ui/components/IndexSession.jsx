import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link } from "react-router-dom";

import { Sessions } from '../../api/collections/sessions';
import AjouterSession from './AjouterSession';

class IndexSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session_active: null,
        }
    }

    render() {
        return (
            <div className="session">
                <div className="index-session">
                    <h2>Sessions</h2>
                    <ul>
                        {this.props.sessions.map((session) => (
                            <Link to={`/session/${session._id}`} key={session._id}>
                                {session.titre}
                                <br />
                            </Link>
                        ))}
                    </ul>
                    {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
                        <AjouterSession />
                    }
                </div>
            </div>
        )
    }
}

export default withTracker((props) => {
    Meteor.subscribe('sessions');
    return {
        sessions: Sessions.find().fetch(),
    }
})(IndexSession);