import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Chapitres } from '../../api/collections/chapitres'
import IndexChapitre from '../ui/IndexChapitre'

class IndexChapitresContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badges: [{}],
        }
    }

    componentDidMount() {
        Meteor.call('documents.nombre.badge', (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
                this.setState({ badges: result })
            }
        });
    }

    render() {

        if (!this.props.loading && this.props.chapitresExists) {

            return (
                <IndexChapitre {...this.props} badges={this.state.badges} />
            )

        } else {

            return (
                <p>chargement en cours</p>
            )
        }

        
    }
};

export default IndexChapitresContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres', { session: props.sessionId })
    const loading = !chapitresHandle.ready();
    const chapitres = Chapitres.find({ session: props.sessionId }).fetch()
    const chapitresExists = !loading && !!chapitres;
    return {
      loading,
      chapitresExists,
      chapitres: chapitresExists ? chapitres : []
    }
  })(IndexChapitresContainer);