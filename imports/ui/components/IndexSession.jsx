import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Route, Link } from "react-router-dom";

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
            <div>
                <h2>Sessions</h2>
                <ul>
                    {this.props.sessions.map((session) => (
                        <Link to={`/session/${session._id}`} key={session._id}>
                            {session.titre}
                            <br />
                            <button onClick={() => Meteor.call('sessions.remove', session._id)}>Supprimer la session</button>
                            <br />
                        </Link>
                    ))}
                </ul>
                {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
                    <Link to="/session/creer">Ajouter une session</Link>
                }
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