import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../../api/collections/documents';

// import IndexDocumentsCorrecteur from './IndexDocumentsCorrecteur';
import DetailsDocumentsCorrecteur from './DetailsDocumentsCorrecteur';
// import AjouterImage from '../iconographe/AjouterImage'

class CorrectionDocument extends Component {

    render() {
        return (
            <div>

                {this.props.documents.map((document) =>
                    <div key={document._id}>
                        <DetailsDocumentsCorrecteur document={document} />
                        {/* <AjouterImage document={document} /> */}
                    </div>
                )}


            </div>
        )

    }

}

export default CorrectionDocumentContainer = withTracker((props) => {

    const documentsHandler = Meteor.subscribe('documents');
    const loading = !documentsHandler.ready();
    const documents = Documents.find({ chapitre: props.chapitre._id }).fetch();
    const documentsExists = !loading && !!documents;

    return {
        loading,
        documentsExists,
        documents: documentsExists ? documents : []
    }

})(CorrectionDocument);
