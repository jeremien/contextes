import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Route, Link } from "react-router-dom";
import PropTypes from 'prop-types'

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

    static propTypes = {
        sessions: PropTypes.isRequired,
    };

    static defaultProps = {
        sessions: [{}],
    };

    render() {
        return (
            <div>
                <h2>Sessions</h2>
                <ul>
                    {this.props.sessions.map((session) => (
                        <li key={session._id}>
                            <Link to={`/session/${session._id}`}>
                                {session.titre}
                            </Link>
                            <button onClick={() => Meteor.call('sessions.remove', session._id)}>Supprimer la session</button>
                            <br />
                        </li>
                    ))}
                </ul>
                {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
                    <Link to="/session/creer">Ajouter une session</Link>
                }
            </div>
        )
    }
};

export default withTracker((props) => {
    Meteor.subscribe('sessions');
    return {
        sessions: Sessions.find().fetch(),
    }
})(IndexSession);