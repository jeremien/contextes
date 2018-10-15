import React from 'react'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Chapitres } from '../../api/collections/chapitres';
import { Connexions } from '../../api/collections/connexions';

import AjouterDocument from '../outils/transcripteur/AjouterDocument';
import CorrectionDocument from '../outils/correcteur/CorrectionDocument';
import DetailsDocumentsConformateur from '../outils/conformateur/DetailsDocumentsConformateur';
import AjouterImages from '../outils/editeur/AjouterImage'

import AlertMessage from '../ui/AlertMessage';

import IndexDocumentsTable from '../ui/IndexDocumentsTable';
import IndexDocuments from '../ui/IndexDocuments';

import InfosChapitre from '../ui/InfosChapitre';
import DetailsChapitre from '../ui/DetailsChapitre';

import DisplayTimer from '../ui/DisplayTimer';

import { Divider } from 'antd';


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

    getOutils(propToPass) {
        switch (this.props.role) {
            case 'transcripteur':
                return {
                    outilgauche: <InfosChapitre {...propToPass} />,
                    outildroit: <div>
                                    <AlertMessage {...propToPass} />
                                    <Divider/>
                                    <DisplayTimer {...propToPass} />
                                    <Divider/>
                                    <AjouterDocument {...propToPass} />
                                </div>
                }
                break;
            case 'correcteur':
                return {
                    outilgauche: <InfosChapitre {...propToPass} />,
                    outildroit: <div>
                        <IndexDocuments {...propToPass} />
                        {/* <CorrectionDocument {...propToPass} /> */}
                        </div>
                }
                break;
            // case 'conformateur':
            //     return {
            //         outilgauche: <InfosChapitre {...propToPass} />,
            //         outildroit: <DetailsDocumentsConformateur {...propToPass} />
            //     }
            case 'editeur':
                return {
                    outilgauche: <InfosChapitre {...propToPass} />,
                    outildroit: <div>
                        <IndexDocuments {...propToPass} />
                        <Divider/>
                        <IndexDocumentsTable {...propToPass} />
                        {/* <AjouterImages {...propToPass} /> */}
                    </div>
                }
                break;
            default:
                return <h2>Pas d'outils</h2>
        }
    }

    render() {

        // console.log(this.props.socket)

        if (this.props.chapitreExists && !this.props.loading) {
            var { match, path, ...rest } = this.props;
            const outils = this.getOutils({ ...rest });
            return <DetailsChapitre outils={outils} {...rest} />
        }
        else {
            return <h3>Chargement</h3>
        }
    }
};

export default withTracker((props) => {
    const connexionsHandle = Meteor.subscribe('connexions')
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !chapitresHandle.ready() && !connexionsHandle.ready(); //vaut true si les données ne sont pas encore chargées.
    var connexions = Connexions.find(
        {
            chapitre: props.match.params.idChapitre,
            role: { $ne: 'editeur' }
        },
    );
    const chapitre = Chapitres.findOne({ _id: props.match.params.idChapitre });
    const connexionsExists = !loading && !!connexions;
    const chapitreExists = !loading && !!chapitre; //vaut false si aucun chapitre n'existe ou si aucun n'a été trouvé
    return ({
        loading,
        chapitreExists,
        connexionsExists,
        connexions: connexionsExists ? connexions.fetch() : [{}],
        chapitre: chapitreExists ? chapitre : [],
    })
})(DetailsChapitreContainer);

