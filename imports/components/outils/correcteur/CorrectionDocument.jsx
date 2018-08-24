import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../../api/collections/documents';

import IndexDocumentsCorrecteur from './IndexDocumentsCorrecteur';

class CorrectionDocument extends Component {

    render() {

        // console.log(this.props.documents)

        return (
            <div>
                
                {this.props.documents.map((document) => 
                    <IndexDocumentsCorrecteur key={document._id} document={document} />
                )}

                
            </div>
        )

    }

}

export default CorrectionDocumentContainer = withTracker((props) => {

    const documentsHandler = Meteor.subscribe('documents');
    const loading = !documentsHandler.ready();
    const documents = Documents.find({chapitre : props.chapitre._id}).fetch();
    const documentsExists = !loading && !!documents;

    return {
        loading,
        documentsExists,
        documents: documentsExists ? documents : []
    }

})(CorrectionDocument);