import React from 'react'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Connexions } from '../../api/collections/connexions';

import ConnexionsCourantes from '../outils/ConnexionsCourantes'

class ConnexionsCourantesContainer extends React.Component {
    static propTypes = {
        chapitreId: PropTypes.string.isRequired,
    }

    static defaultProps = {
        chapitreId: ""
    }

    render() {
        if (this.props.loading) {
            return <h3>Chargement</h3>
        }
        if (this.props.connexionsExists) {
            return <ConnexionsCourantes {...this.props} />
        }
        else {
            return <h3>Pas de personnes connectées actuellement</h3>
        }
    }
};

export default withTracker((props) => {
    const connexionsHandle = Meteor.subscribe('connexions')
    const loading = !connexionsHandle.ready(); //vaut true si les données ne sont pas encore chargées.
    var connexions = Connexions.find(
        {
            chapitre: props.chapitre._id,
            role: { $ne: 'editeur' }
        },
    );
    const connexionsExists = !loading && !!connexions;
    return ({
        loading,
        connexionsExists,
        connexions: connexionsExists ? connexions.fetch() : [{}],
    })
})(ConnexionsCourantesContainer);
