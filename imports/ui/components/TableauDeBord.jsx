import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres'

class TableauDeBord extends React.Component {
    render() {
        return(
            <div className="tableau-de-bord">
            <h3>Tableau de bord</h3>
            {this.props.chapitres.map((chapitre) => {
                <div>
                    {chapitre.utilisateurs_connectes}
                </div>
            })}
            </div>
        )
    }
}

export default withTracker((props) => {
    Meteor.subscribe('sessions');
    Meteor.subscribe('chapitres')
    return {
        sessions: Sessions.findOne({}),
        chapitres: Chapitres.find({session: {sessionId: props.sessions._id, sessionTitre: props.sessions.titre}})
    }
})(TableauDeBord);