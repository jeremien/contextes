import React from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'

import { Commentaires } from '../../api/collections/commentaires';
import { Chapitres } from '../../api/collections/chapitres';
import AjouterCommentaire from './AjouterCommentaire';
import Commentaire from './Commentaire';

class Chapitre extends React.Component {
    componentWillUpdate() {
        if (Session.get('connecte')) {
            Meteor.call('chapitres.connexion', this.props.match.params.id, Session.get('utilisateur'));
        }
    };

    componentWillUnmount() {
        Meteor.call('chapitres.deconnexion', this.props.match.params.id, Session.get('utilisateur'));
    };

    componentWillMount() {
        if (Session.get('connecte')) {
            Meteor.call('chapitres.connexion', this.props.match.params.id, Session.get('utilisateur'));
        }
    };

    render() {
        return (
            <div>
                {!!this.props.chapitre &&
                    <div>
                        <h3>Chapitre : {this.props.chapitre.titre}</h3>
                        <ul>
                            {this.props.commentaires.map((commentaire) => (
                                <Commentaire commentaire={commentaire} key={commentaire._id} />
                            ))}
                        </ul>
                        {(!!Session.get('connecte') && Session.get('role') == "transcripteur") &&
                            <AjouterCommentaire chapitreId={this.props.chapitre._id} sessionId={this.props.chapitre.session} />
                        }
                        <Link to={`/session/${this.props.chapitre.session}`}>Retourner à l'index de la session</Link>
                    </div>
                }

            </div>
        )
    }
}

export default withTracker((props) => {
    Meteor.subscribe('chapitres');
    Meteor.subscribe('commentaires');
    return {
        chapitre: Chapitres.findOne({ _id: props.match.params.id }),
        commentaires: Commentaires.find({ chapitre: props.match.params.id }).fetch(),
    };
})(Chapitre);