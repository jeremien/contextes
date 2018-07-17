import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link } from "react-router-dom";

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres'
import { Connexions } from '../../api/collections/connexions';

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
        
        if (!!this.props.session) {
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
                    <Link to={`/session/${this.props.match.params.id}`}>Retourner à l'index de la session</Link>
                </div>
            )
        }
    }
}

export default withTracker((props) => {
    Meteor.subscribe('sessions');
    Meteor.subscribe('chapitres');
    Meteor.subscribe('connexions');
    return {
        session: Sessions.findOne({ _id: props.match.params.id }),
        chapitres: Chapitres.find({ session: props.match.params.id }).fetch(),
        connexions: Connexions.find({ session: props.match.params.id }).fetch(),
    }
})(TableauDeBord);