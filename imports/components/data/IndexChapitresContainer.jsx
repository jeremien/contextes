import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Chapitres } from '../../api/collections/chapitres'
import IndexChapitres from '../ui/IndexChapitre'
import { Documents } from '../../api/collections/documents'

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
        })
    }

    render() {
        return (
            <IndexChapitres {...this.props} badges={this.state.badges} />
        )
    }
};

export default IndexChapitresContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !chapitresHandle.ready();
    const chapitres = Chapitres.find({ session: props.sessionId }).fetch()
    const chapitresExists = !loading && !!chapitres;
    return {
      loading,
      chapitresExists,
      chapitres: chapitresExists ? chapitres : []
    }
  })(IndexChapitresContainer);