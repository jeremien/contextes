import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../../api/collections/documents';

import DetailsDocumentsCorrecteur from './DetailsDocumentsCorrecteur';

class CorrectionDocument extends Component {

    render() {

        // console.log(this.props.documents.length)
        // console.log('outils droits')

        if (this.props.documents.length != 0) {

            return (
                <div className="index-documents">

                    <h3>Liste des documents</h3>
                    
                    {this.props.documents.map((document) => 
                
                        <DetailsDocumentsCorrecteur key={document._id} document={document} />
                    )}

                    
                </div>
            )

        } else {

            return (

                <div>
                    <h3>Pas encore de documents créés </h3>
                </div>

            )

        }


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