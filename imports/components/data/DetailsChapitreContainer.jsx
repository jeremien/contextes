import React from 'react'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Chapitres } from '../../api/collections/chapitres';
import { Connexions } from '../../api/collections/connexions';

import AjouterCommentaire from '../outils/AjouterDocument';
import IndexDocuments from '../ui/IndexDocuments';
import InfosChapitre from '../ui/InfosChapitre';
import DetailsChapitre from '../ui/DetailsChapitre';

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
        if (this.props.connecte && !!this.props.chapitreExists) {
            Meteor.call('connexions.chapitre', Session.get('utilisateur'), this.props.chapitre.session, this.props.chapitre._id);
        }
    };

    getOutils(propToPass) {
        switch (this.props.role) {
            case 'transcripteur':
                return {
                    outilgauche: <InfosChapitre {...propToPass} />,
                    outildroit: <AjouterCommentaire {...propToPass} />,
                }
                break;
            case 'correcteur':
            case 'conformateur':
            case 'editeur':
                return {
                    outilgauche: <InfosChapitre {...propToPass} />,
                    outildroit: <IndexDocuments {...propToPass} />,
                }
                break;
            default:
                return <h2>Pas d'outil</h2>
        }
    }

    render() {
        if (this.props.chapitreExists && !this.props.loading) {
            var { match, path, ...rest } = this.props;
            const outils = this.getOutils({...rest});
            return <DetailsChapitre outils={outils} {...rest} />
        }
        else {
            return <h3>Chargement</h3>
        }
    }
};

export default withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const connexionsHandle = Meteor.subscribe('connexions')
    const loading = !chapitresHandle.ready() && !connexionsHandle.ready(); //vaut true si les données ne sont pas encore chargées.
    const chapitre = Chapitres.findOne({ _id: props.match.params.idChapitre });
    const connexions = Connexions.find({ chapitre: props.match.params.idChapitre, role: 'transcripteur' });
    const chapitreExists = !loading && !!chapitre; //vaut false si aucun chapitre n'existe ou si aucun n'a été trouvé
    const connexionsExists = !loading && !!connexions;
    return ({
        loading,
        chapitreExists,
        chapitre: chapitreExists ? chapitre : [],
        connexions: connexionsExists ? connexions.fetch() : [{}],
    })
})(DetailsChapitreContainer);

const TestOutil = (props) => {
    return( 
        <h3>Outil ok</h3>
    )
}