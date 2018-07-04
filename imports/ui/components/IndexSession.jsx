import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Sessions } from '../../api/collections/sessions';
import AjouterSession from './AjouterSession';
import FullSession from './FullSession';
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

    // getChapitre() {
    //     if (!!this.state.session_active) {
    //         return (
    //             <div>
    //                 <h3>Session choisie : {this.state.session_active.sessionTitre}</h3>
                    
    //                 <br />
                    
    //             </div>
    //         )
    //     }
    //     else {
    //         return <h2>Choisir une session à afficher</h2>
    //     }
    // }

    render() {
        return(
            <div className="session">
                <div className="index-session">
                    Sessions
                    
                    <ul>
                    {this.props.sessions.map((session) => (
                            <Link to={`/session/${session._id}`} key={session._id}>
                                {session.titre}
                                <br />
                            </Link>
                    ))}
                    </ul>
                    {!!Session.get('connecte') &&                    
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