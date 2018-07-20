import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Sessions } from '../../api/collections/sessions';
import IndexChapitre from './IndexChapitre';
import TableauDeBord from './TableauDeBord';

class DetailsSession extends React.Component {
    componentDidMount() {
        Meteor.call('connexions.session', this.props.connecte, this.props.sessionId);
    };

    componentWillUnmount() {
        Meteor.call('sessions.deconnexion', this.props.utilisateur);
    }

    // render() {
    //     return (
    //         <Router>
    //             <div>
    //                 <div>
    //                     {!!this.props.sessions &&
    //                         <div>
    //                             <h1>Session : {this.props.session.titre}</h1>
    //                             {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
    //                                 <Link to={`/session/${this.props.sessionId}/admin`}>Tableau de bord</Link>
    //                             }
    //                             <p>{this.props.sessions.description}</p>
    //                             <IndexChapitre session={this.props.sessionId} {...this.props} />
    //                         </div>
    //                     }
    //                 </div>
    //                 <Route exact path={`${this.props.match.path}/chapitre/:id`} component={DetailsChapitre} />

    //                 <Route exact path="/session/:id/admin" component={TableauDeBord} />
    //             </div>
    //         </Router>
    //     )
    // }

    render() {
        if (this.props.sessionId) {
            return (
                <div className="details-session">
                    {(!!this.props.connecte && this.props.role == "editeur") ?
                        <TableauDeBord sessionId={this.props.sessionId} />
                        :
                        <h2>Choisir un chapitre à consulter</h2>
                    }
                    <br />
                    <br />
                        <IndexChapitre sessionId={this.props.sessionId} />
                    
                </div>
            )
        }
        else {
            return (
                <div className="details-session">
                    <h2>Choisir une session à afficher</h2>
                </div>
            )
        }
    }
}

export default DetailsSessionContainer = withTracker((props) => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !sessionsHandle.ready();
    const session = Sessions.findOne({ _id: props.sessionId })
    const sessionExists = !loading && !!session
    return {
        loading,
        sessionExists,
        session: sessionExists ? session : []
    }
})(DetailsSession);
