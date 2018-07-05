import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Session } from 'meteor/session';

import { Sessions } from '../../api/collections/sessions';
import IndexChapitre from './IndexChapitre';
import Chapitre from './Chapitre';

class FullSession extends React.Component {
    componentDidMount() {
        Meteor.call('chapitres.connexion', this.props.match.params.id, Session.get('utilisateur'));
    };

    componentWillUnmount() {
        Meteor.call('sessions.deconnexion', this.props.match.params.id, Session.get('utilisateur'));
    }




    render() {
        return (
            <div>
                {!!this.props.sessions &&
                    <div>
                        <h1>Sessions : {this.props.sessions.titre}</h1>
                        {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
                            <Link to={`/session/${this.props.match.params.id}/admin`}>Tableau de bord</Link>
                        }
                        <IndexChapitre session={this.props.match.params.id} {...this.props} />
                    </div>
                }
                
            </div>
        )
    }
}

export default withTracker((props) => {
    Meteor.subscribe('sessions');
    return {
        sessions: Sessions.findOne({ _id: props.match.params.id }),
    };
})(FullSession);
