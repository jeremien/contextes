import React from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'

import { Chapitres } from '../../api/collections/chapitres';
import AjouterCommentaire from './AjouterDocument';
import IndexDocuments from './IndexDocuments'
import InfosChapitre from './InfosChapitre';

export default function DetailsChapitre(props) {

    if (props.loading) {
        return (
            <div className="details-chapitre">
                <h3>Chargement en cours</h3>
            </div>
        )
    }

    if (props.chapitreExists) {
        return (
            <div className="details-chapitre">
                <div className="details-chapitre-gauche">
                    <InfosChapitre {...props} />
                    <Link to={"/sessions"}>Retourner à l'index de la session</Link>
                </div>
                <div className="details-chapitre-droite">
                    <IndexDocuments {...props} />
                    {props.outils}
                </div>
                
            </div>
        )
    }

    return (
        <div className="details-chapitre">
            <h3>Choisir un chapitre</h3>
        </div>
    )
}


// export default DetailsChapitreContainer = withTracker((props) => {
//     const chapitresHandle = Meteor.subscribe('chapitres');
//     const loading = !chapitresHandle.ready(); //vaut true si les données ne sont pas encore chargées.
//     const chapitre = Chapitres.findOne({ _id: props.match.params.idChapitre });
//     const chapitreExists = !loading && !!chapitre; //vaut false si aucun chapitre n'existe ou si aucun n'a été trouvé
//     return {
//         loading,
//         chapitreExists,
//         chapitre: chapitreExists ? chapitre : []
//     }
// })(DetailsChapitre);