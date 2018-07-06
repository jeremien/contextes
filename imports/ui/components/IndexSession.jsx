import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

import { Sessions } from '../../api/collections/sessions';
import AjouterSession from './AjouterSession';
import Chapitre from './Chapitre';
import FullSession from './FullSession';
import TableauDeBord from './TableauDeBord';

class IndexSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session_active: null,
        }
    }

    render() {
        return (
            <Router>
                <div>
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

                    <Route exact path="/session/:id" component={FullSession} />
                    <Route exact path="/session/:id/admin" component={TableauDeBord} />

                </div>
            </Router>
        )
    }
}

export default withTracker((props) => {
    Meteor.subscribe('sessions');
    return {
        sessions: Sessions.find().fetch(),
    }
})(IndexSession);