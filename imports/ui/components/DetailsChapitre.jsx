import React from '../../../../../../../.cache/typescript/2.9/node_modules/@types/react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from '../../../../../../../.cache/typescript/2.9/node_modules/@types/react-router-dom'

import { Commentaires } from '../../api/collections/commentaires';
import { Chapitres } from '../../api/collections/chapitres';
import AjouterCommentaire from './AjouterCommentaire';
import Commentaire from './Commentaire';

class DetailsChapitre extends React.Component {
    constructor(props) {
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this)
        this.state = {
            timer: false,
        }
    }

    componentWillUnmount() {
        Meteor.call('deconnection.chapitre', Session.get('utilisateur'));
    };

    //Méthode à changer avec willMount/update selon l'endroit où sera définie la route
    componentDidMount() {
        if (Session.get('connecte') && !!this.props.chapitre) {
            Meteor.call('connexions.chapitre', Session.get('utilisateur'), this.props.chapitre.session, this.props.chapitre._id);
            console.log('connexion essayée')
        }
    };
    /**
     * Appele de la méthode d'update du timer automatique.
     * Appelée ici toutes les secondes (1000 millisecondes)
     * L'id de setIntervalle est stocké dans le state "timer" pour pouvori être arrêté ensuite
     */
    startTimer(chapitreId, tempsTimer) {
        if (!this.state.timer) {
            Session.set('timerId', Meteor.setInterval(function () {
                Meteor.call('chapitres.timer.update', chapitreId, tempsTimer)
            }, 1000));
            Meteor.setTimeout(function () { Meteor.clearInterval(Session.get('timerId')) }, this.props.chapitre.duree_chapitre * 60 * 1000);
            this.setState({ timer: true })
        }

    }

    stopTimer() {
        Meteor.clearInterval(Session.get('timerId'))
        Meteor.call('chapitres.timer.reset', this.props.chapitre._id)
        this.setState({ timer: false })
    }

    render() {
        return (
            <div>
                    <div>
                        <h3>Chapitre : {this.props.chapitre.titre}</h3>
                        <p>{this.props.chapitre.description}</p>
                        {Session.get('role') == "editeur" &&
                            <div className="timer">
                                <button className="start-timer" onClick={() => { this.startTimer(this.props.chapitre._id, 120) }}>Démarrer le timer</button>
                                <button className="start-timer" onClick={this.stopTimer}>Arreter le timer</button>
                            </div>
                        }
                        <p>Temps restant : {this.props.chapitre.timer}</p>
                        {/* <ul>
                            {this.props.commentaires.map((commentaire) => (
                                <Commentaire commentaire={commentaire} key={commentaire._id} />
                            ))}
                        </ul> */}
                        {(!!Session.get('connecte') && Session.get('role') == "transcripteur") &&
                            <AjouterCommentaire chapitreId={this.props.chapitre._id} sessionId={this.props.chapitre.session} />
                        }
                        <Link to={`/session/${this.props.chapitre.session}`}>Retourner à l'index de la session</Link>
                    </div>
            </div>
        )
    }
}

export default DetailsChapitre = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !chapitresHandle.ready();
    const chapitre = Chapitres.findOne({ _id: props.match.params.id });
    const chapitreExists = !loading && !!chapitre;
    return {
        loading,
        chapitreExists,
        chapitre: chapitreExists ? chapitre : []
    }
})(DetailsChapitre);