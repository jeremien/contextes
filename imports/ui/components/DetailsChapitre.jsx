import React from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'

import { Chapitres } from '../../api/collections/chapitres';
import AjouterCommentaire from './AjouterDocument';
import IndexDocuments from './IndexDocuments'
import InfosChapitre from './InfosChapitre';

class DetailsChapitre extends React.Component {
    componentWillUnmount() {
        Meteor.call('deconnection.chapitre', Session.get('utilisateur'));
    };

    //Méthode à changer avec willMount/update selon l'endroit où sera définie la route
    componentDidMount() {
        if (Session.get('connecte') && !!this.props.chapitre) {
            Meteor.call('connexions.chapitre', Session.get('utilisateur'), this.props.chapitre.session, this.props.chapitre._id);
        }
    };



    render() {
        if (this.props.loading) {
            return (
                <div className="details-chapitre">
                    <h3>Chargement en cours</h3>
                </div>
            )
        }

        if (this.props.chapitreExists) {
            return (
                <div className="details-chapitre">
                    <div className="infos-chapitre">
                        <InfosChapitre {...this.props} />
                    </div>
                    <div className="documents">
                        <IndexDocuments {...this.props} />
                        {(this.props.connecte && this.props.role == "transcripteur") &&
                            <AjouterCommentaire chapitreId={this.props.chapitre._id} sessionId={this.props.chapitre.session} />
                        }
                    </div>
                    <Link to={`/sessions/${this.props.match.idSession}`}>Retourner à l'index de la session</Link>
                </div>
            )
        }

        return (
            <div className="details-chapitre">
                <h3>Choisir un chapitre</h3>
            </div>
        )
    }
}

export default DetailsChapitre = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !chapitresHandle.ready(); //vaut true si les données ne sont pas encore chargées.
    const chapitre = Chapitres.findOne({ _id: props.match.params.idChapitre });
    const chapitreExists = !loading && !!chapitre; //vaut false si aucun chapitre n'existe ou si aucun n'a été trouvé
    return {
        loading,
        chapitreExists,
        chapitre: chapitreExists ? chapitre : []
    }
})(DetailsChapitre);