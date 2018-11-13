import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Documents } from '../../api/collections/documents'
import { Images } from '../../api/collections/images';

import DetailsDocumentVisualisation from '../ui/DetailsDocumentVisualisation';

class DetailsDocumentsContainer extends Component {


    render() {

        if (!this.props.loading) {

            if ( this.props.documentsExists) {
                
                return this.props.documents.map((item) => {

                    if (!item.rejete) {

                            return <DetailsDocumentVisualisation key={item._id} {...item} />
                        
                    } else {

                        return undefined;
                    }
                });

            } else {
                return <div>pas de documents</div>
            }

        } else {

            return <div>chargement</div>
        }


        // return <DetailsDocumentVisualisation />
    }
}

export default DetailsDocumentsContainer = withTracker((props) => {

    // console.log(props)

    const documentsHandler = Meteor.subscribe('documents');
    const loading = !documentsHandler.ready();
    const documents = Documents.find( { chapitre: props._id }).fetch();
    const documentsExists = !loading && !!documents;

    return {
        loading,
        documentsExists,
        documents : documentsExists ? documents : []
    }

})(DetailsDocumentsContainer);