import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link } from "react-router-dom";

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres'
import { Connexions } from '../../api/collections/connexions';

class TableauDeBord extends React.Component {

    afficheChap(chapitre) {
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

    render() {
        return (
            <div className="tableau-de-bord">
                <h2>Tableau de bord</h2>
                <h3>Personne en train de modifier :</h3>
                <ul>
                    {this.props.chapitres.map((chapitre) => (
                        <li key={chapitre._id}>
                            {chapitre.titre}
                            <br />
                            {this.afficheChap(chapitre._id)}
                        </li>
                    ))}
                </ul>
                <Link to={`/session/${this.props.match.params.id}`}>Retourner à l'index de la session</Link>
            </div>
        )
    }
}

export default withTracker((props) => {
    Meteor.subscribe('sessions');
    Meteor.subscribe('chapitres');
    Meteor.subscribe('connexions');
    return {
        sessions: Sessions.findOne({ _id: props.match.params.id }),
        chapitres: Chapitres.find({ session: props.match.params.id }).fetch(),
        connexions: Connexions.find({ session: props.match.params.id }).fetch(),
    }
})(TableauDeBord);