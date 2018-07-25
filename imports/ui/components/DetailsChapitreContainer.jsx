import React from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Chapitres } from '../../api/collections/chapitres';
import { Connexions } from '../../api/collections/connexions';
import AjouterCommentaire from './AjouterDocument';
import IndexDocuments from './IndexDocuments'
import InfosChapitre from './InfosChapitre';
import DetailsChapitre from './DetailsChapitre';

class DetailsChapitreContainer extends React.Component {
    constructor(props) {
        super(props)
        this.getOutils = this.getOutils.bind(this)
    }
    static propTypes = {
        role: PropTypes.string.isRequired,
    }

    static defaultProps = {
        role: ""
    }

    componentWillUnmount() {
        Meteor.call('deconnection.chapitre', Session.get('utilisateur'));
    };

    //Méthode à changer avec willMount/update selon l'endroit où sera définie la route
    componentDidMount() {
        if (Session.get('connecte') && !!this.props.chapitre) {
            Meteor.call('connexions.chapitre', Session.get('utilisateur'), this.props.chapitre.session, this.props.chapitre._id);
        }
    };

    getOutils() {
        switch (this.props.role) {
            case 'transcripteur':
                return <AjouterCommentaire {...this.props} />
                break;
            case 'correcteur':
            case 'conformateur':
            case 'editeur':
                return <AjouterCommentaire {...this.props} />
                break;
            default:
                return <h2>Pas d'outil</h2>
        }
    }

    render() {
        if(!this.props.loading) {
        const outils = this.getOutils();
        return <DetailsChapitre outils={outils} {...this.props} />
        }
        else {
            return <h3>Chargement</h3>
        }
    }
};

export default DetailsChapitreContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const connexionsHandle = Meteor.subscribe('connexions')
    const loading = !chapitresHandle.ready() && !connexionsHandle; //vaut true si les données ne sont pas encore chargées.
    const chapitre = Chapitres.findOne({ _id: props.match.params.idChapitre });
    const connexions = Connexions.find({chapitre: props.match.params.idChapitre, role: 'transcripteur'});
    const chapitreExists = !loading && !!chapitre && !!connexions; //vaut false si aucun chapitre n'existe ou si aucun n'a été trouvé
    return ({
        loading,
        chapitreExists,
        chapitre: chapitreExists ? chapitre : [],
        connexions: connexionsHandle ? connexions.fetch() : [],
    })
})(DetailsChapitreContainer);