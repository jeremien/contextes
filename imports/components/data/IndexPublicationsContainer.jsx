import React from 'react';

import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Publications } from '../../api/collections/publication'

import IndexPublications from '../ui/IndexPublications';

class IndexPublicationsContainer extends React.Component {

    render() {

        return (

            <IndexPublications {...this.props} />

        )
    }

}

export default IndexPublicationsContainer = withTracker((props) => {

    const publicationsHandle = Meteor.subscribe('publications');
    const loading = !publicationsHandle.ready();
    const publications = Publications.find().fetch();
    const publictionsExists = !loading && !!publications;

    return {
        loading,
        publictionsExists,
        publications: publictionsExists ? publications : []
    }

})(IndexPublicationsContainer);