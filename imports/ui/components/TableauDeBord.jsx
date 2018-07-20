import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom';

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres'
import { Connexions } from '../../api/collections/connexions';

import AjouterChapitre from './AjouterChapitre';

class TableauDeBord extends React.Component {
    afficheModifications(chapitre) {
        return (
            <ul>
                {this.props.connexions.map((connexion) => (
                    <div key={connexion.utilisateur}>
                        {connexion.chapitre == chapitre &&
                            <li >
                                {connexion.utilisateur}
                            </li>
                        }
                    </div>
                ))}
            </ul>
        )
    }

    getJauges() {
        var transcritpeurs = 0;
        var correcteurs = 0;
        var conformateurs = 0;
        // this.props.connexions.map((connexion) => (
        //     switch (connexion.role) {
        //         case 
        //     }
        // ));
        return (transcritpeurs, correcteurs, conformateurs)
    }

    render() {
        if (this.props.loading) {
            return (
                <h3>Chargement en cours</h3>
            )
        }

        if (this.props.sessionExists) {
            return (
                <div className="tableau-de-bord">
                    <h2>{this.props.session.titre} : tableau de bord</h2>
                    <br />
                    <h3>Rendre la session éditable</h3>
                    <button onClick={() => Meteor.call('sessions.ouvrir', this.props.session._id)}>Rendre la session éditable</button>
                    <h3>Rôles autorisés :</h3>
                    <ul>
                        {Object.entries(this.props.session.roles).map(([role, nombre]) => (
                            <li key={role}>{role} : {nombre}</li>
                        ))}
                    </ul>
                    <h3>Personne en train de modifier :</h3>
                    <ul>
                        {this.props.chapitres.map((chapitre) => (
                            <li key={chapitre._id}>
                                {chapitre.titre}
                                <br />
                                {this.afficheModifications(chapitre._id)}
                            </li>
                        ))}
                    </ul>
                    <AjouterChapitre sessionId={this.props.sessionId} />
                </div>

            )
        }

        return (
            <div className="tableau-de-bord">
                <h2>Choisir une session</h2>
            </div>
        )
    }
}

export default IndexSessionContainer = withTracker((props) => {
    const sessionHandle = Meteor.subscribe('sessions');
    const chapitresHandle = Meteor.subscribe('chapitres');
    const connexionsHandle = Meteor.subscribe('connexions')

    const loading = !sessionHandle.ready() && !chapitresHandle.ready() && !connexionsHandle.ready();
    const session = Sessions.findOne({ _id: props.sessionId });
    const chapitres = Chapitres.find({ session: props.sessionId }).fetch();
    const connexions = Connexions.find({ session: props.sessionId }).fetch()
    const sessionExists = !loading && !!session;
    const chapitresExists = !loading && !!chapitres;
    const connexionsExists = !loading && !!connexions;
    return {
        loading,
        sessionExists,
        chapitresExists,
        connexionsExists,
        session: sessionExists ? session : [],
        chapitres: chapitresExists ? chapitres : [],
        connexions: connexionsExists ? connexions : [],
    }
})(TableauDeBord);