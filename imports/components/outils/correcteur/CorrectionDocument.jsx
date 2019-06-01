import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../../api/collections/documents';

import DetailsDocumentsCorrecteur from './DetailsDocumentsCorrecteur';
import DetailsDocumentsCorrecteurLecture from './DetailsDocumentsCorrecteurLecture';
class CorrectionDocument extends Component {

    render() {

        if (this.props.chapitre.isOpen) {
            return this.props.documents.map((document) => {
                        return <div key={document._id} className="details-documents-container">
                            <DetailsDocumentsCorrecteur document={document} utilisateur={this.props.utilisateur} />
                            <DetailsDocumentsCorrecteurLecture document={document} />
                        </div>
                        })
        } else {
            return (
                <p>le chapitre est fermé</p>
            )
        }        
    }
}

export default CorrectionDocumentContainer = withTracker((props) => {

    const documentsHandler = Meteor.subscribe('documents');
    const loading = !documentsHandler.ready();
    const documents = Documents.find({ chapitre: props.chapitre._id },{ sort: { creation : -1}}).fetch();
    const documentsExists = !loading && !!documents;

    return {
        loading,
        documentsExists,
        documents: documentsExists ? documents : []
    }

})(CorrectionDocument);
