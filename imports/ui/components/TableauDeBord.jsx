import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom';

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres'
import { Connexions } from '../../api/collections/connexions';

import AjouterChapitre from './AjouterChapitre';

class TableauDeBord extends React.Component {
    state = {
        etat: this.props.session.etat,
    }

    // afficheModifications(chapitre) {
    //     return (
    //         <ul>
    //             {this.props.connexions.map((connexion) => (
    //                 <div key={connexion.utilisateur}>
    //                     {connexion.chapitre == chapitre &&
    //                         <li >
    //                             {connexion.utilisateur}
    //                         </li>
    //                     }
    //                 </div>
    //             ))}
    //         </ul>
    //     )
    // }

    // getJauges() {
    //     var remplissage = {transcripteur: 0, correcteur: 0, conformateur: 0}
    //     this.props.connexions.map((connexion) => (() => {
    //         switch (connexion.role) {
    //             case 'transcritpeur':
    //                 remplissage.transcritpeur++;
    //                 break;
    //             case 'correcteurs':
    //                 remplissage.correcteur++
    //                 break;
    //         }
    //     }
    //     ));
    //     return remplissage
    // }

    handleEtat(event) {

    }

    render() {
        if (this.props.loading) {
            return (
                <h3>Chargement en cours</h3>
            )
        }

        else {
            return (
                <div className="tableau-de-bord">
                    <h2>{this.props.session.titre} : tableau de bord</h2>
                    <h3>Etat de la session</h3>
                    <form className="etat-session">
                        <input type="checkbox" name="edition" />
                    </form>
                    <button onClick={() => Meteor.call('sessions.ouvrir', this.props.session._id)}>Rendre la session éditable</button>
                    <h3>Rôles autorisés :</h3>
                    <ul>
                        {Object.entries(this.props.session.roles).map(([role, nombre]) => (
                            <li key={role}>{role} : {nombre}</li>
                        ))}
                    </ul>
                    <AjouterChapitre sessionId={this.props.session._id} />
                </div>
            )
        }
    }
}

export default IndexSessionContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !chapitresHandle.ready()
    const chapitres = Chapitres.find({ session: props.session._id }).fetch();
    const chapitresExists = !loading && !!chapitres;
    return {
        loading,
        chapitresExists,
        chapitres: chapitresExists ? chapitres : [],
    }
})(TableauDeBord);