import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Session } from 'meteor/session';

import { Sessions } from '../../api/collections/sessions';
import IndexChapitre from './IndexChapitre';
import DetailsChapitre from './DetailsChapitre';

import TableauDeBord from './TableauDeBord';

class DetailsSession extends React.Component {
    componentDidMount() {
        Meteor.call('connexions.session', Session.get('utilisateur'), this.props.match.params.id);
    };

    componentWillUnmount() {
        Meteor.call('sessions.deconnexion', Session.get('utilisateur'));
    }

    render() {
        return (
            <Router>
                <div>
                    <div>
                        {!!this.props.sessions &&
                            <div>
                                <h1>Sessions : {this.props.sessions.titre}</h1>
                                {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
                                    <Link to={`/session/${this.props.match.params.id}/admin`}>Tableau de bord</Link>
                                }
                                <p>{this.props.sessions.description}</p>
                                <IndexChapitre session={this.props.match.params.id} {...this.props} />
                            </div>
                        }
                    </div>
                    <Route exact path={`${this.props.match.path}/chapitre/:id`} component={DetailsChapitre} />

                    <Route exact path="/session/:id/admin" component={TableauDeBord} />
                </div>
            </Router>
        )
    }
}

// export default withTracker((props) => {
//     Meteor.subscribe('sessions');
//     return {
//         sessions: Sessions.findOne({ _id: props.match.params.id }),
//     };
// })(FullSession);
export default DetailsSessionContainer = withTracker((props) => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !sessionsHandle.ready();
    const sessions = Sessions.findOne({ _id: props.match.params.id });
    const sessionsExists = !loading && !!sessions;
    return {
        loading,
        sessionsExists,
        sessions: sessionsExists ? sessions : []
    }
})(DetailsSession);
