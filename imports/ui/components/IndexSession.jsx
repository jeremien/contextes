import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Sessions } from '../../api/collections/sessions';
import AjouterSession from './AjouterSession';
import IndexChapitre from './IndexChapitre';
import TableauDeBord from './TableauDeBord';


class IndexSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session_active: null,
        }
        this.handleClick=this.handleClick.bind(this);
    }
    
    handleClick(event, session) {
        this.setState({session_active: session});
    }

    getChapitre() {
        if (!!this.state.session_active) {
            return (
                <div>
                    <h3>Session choisie : {this.state.session_active.sessionTitre}</h3>
                    <br />
                    <Link to={`/session/${this.state.session_active.sessionId}/admin`}>Tableau de bord</Link>
                    <IndexChapitre session={this.state.session_active} {...this.props}/>
                </div>
            )
        }
        else {
            return <h2>Choisir une session à afficher</h2>
        }
    }

    render() {
        return(
            <Router>
            <div className="session">
                <div className="index-session">
                    Sessions
                    <ul>
                    {this.props.sessions.map((session) => (
                            <li key={session._id} 
                                onClick={() => this.handleClick(event, {sessionId: session._id, sessionTitre: session.titre} )} 
                                data={session._id}>
                                {session.titre}
                            </li>
                    ))}
                    </ul>

                    <AjouterSession />
                </div>
                <div className="liste-chapitre">
                    {this.getChapitre()}
                </div>
                <Route path="/session/:id/admin" component={TableauDeBord} />
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