import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Publications } from '../../api/collections/publication'

import DetailsPublication from '../ui/DetailsPublication';

class DetailsPublicationsContainer extends Component {

    render() {

        // console.log(this.props)

        if (this.props.publicationsExists && !this.props.loading) {

            let { publication } = this.props;

            if (this.props.role === 'editeur') {

                    return <DetailsPublication {...publication} {...this.props} />               
            
            } else {

                return <div>publication non modifiable</div>
            }

            

        } else {

            return <div>chargement</div>
        }
    }
}

export default DetailsPublicationsContainer = withTracker((props) => {

    const publicationsHandle = Meteor.subscribe('publications');
    const loading = !publicationsHandle.ready();
    const publication = Publications.findOne(
        {
            _id : props.match.params.idPublication
        }
    );
    const publicationsExists = !loading && !!publication;

    return ({
        loading,
        publicationsExists,
        publication: publicationsExists ? publication : []
    })

})(DetailsPublicationsContainer);