import React from 'react'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Chapitres } from '../../api/collections/chapitres';
import { Connexions } from '../../api/collections/connexions';
import { Sessions } from '../../api/collections/sessions';

// transcripteur
import AjouterDocument from '../outils/transcripteur/AjouterDocument';
import Typing from '../outils/transcripteur/Typing';

// iconographe
import AjouterImages from '../outils/iconographe/AjouterImage';

// correcteur
import CorrectionDocument from '../outils/correcteur/CorrectionDocument';

// shared
import IndexDocumentsContainer from '../data/IndexDocumentsContainer';

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

    componentWillMount() {
        let sessionOk = false;
  
    }

    getOutils(propToPass) {
        switch (this.props.role) {
            case 'transcripteur':
                return {
                    outilgauche: <AjouterDocument {...propToPass} />,
                    outildroit: <>
                                    <Typing {...propToPass} />
                                    <IndexDocumentsContainer {...propToPass} />
                                </>
                }
                break;
            
            case 'iconographe':
                return {
                    outilgauche: <AjouterImages {...propToPass} />,
                    outildroit:  <IndexDocumentsContainer {...propToPass} />
                }

            case 'correcteur':
                return {
                    outilgauche: <IndexDocumentsContainer {...propToPass} /> ,
                    outildroit: <CorrectionDocument {...propToPass} />
                }
                break;

            case 'editeur':
                return {
                    outilgauche: undefined,
                    outildroit: undefined
                }
                break;

            default:
                return <p>Pas d'outils</p>
        }
    }

    render() {
        if (this.props.chapitreExists && !this.props.loading) {
            var { match, path, ...rest } = this.props;
            const outils = this.getOutils({ ...rest });
            return <DetailsChapitre outils={outils} {...rest} test={this.test} />
        }

        else {
            return <div>Chargement</div>
        }
    }
};

export default withTracker((props) => {
    const connexionsHandle = Meteor.subscribe('connexions')
    const chapitresHandle = Meteor.subscribe('chapitres', {session: props.match.params.idSession})
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !chapitresHandle.ready() && !connexionsHandle.ready() & !sessionsHandle.ready();; //vaut true si les données ne sont pas encore chargées.
    const session = Sessions.findOne({ _id: props.match.params.sessionId })
    const sessionExists = !loading && !!session
    var connexions = Connexions.find(
        {
            chapitre: props.match.params.idChapitre,
            role: { $ne: 'editeur' }
        },
    );
    const transcripteurs = Connexions.find({
        chapitre: props.match.params.idChapitre,
        role: 'transcripteur',
    })
    const chapitre = Chapitres.findOne({ _id: props.match.params.idChapitre });
    const connexionsExists = !loading && !!connexions;
    const chapitreExists = !loading && !!chapitre; //vaut false si aucun chapitre n'existe ou si aucun n'a été trouvé
    return ({
        loading,
        chapitreExists,
        connexionsExists,
        connexions: connexionsExists ? connexions.fetch() : [{}],
        chapitre: chapitreExists ? chapitre : [],
        session: sessionExists ? session : [],
        transcripteurs: !!transcripteurs ? transcripteurs.fetch() : [{}],
    })
})(DetailsChapitreContainer);

