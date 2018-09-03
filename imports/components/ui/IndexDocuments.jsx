import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';
import DetailsDocument from './DetailsDocument';
import AjouterImage from '../outils/editeur/AjouterImage'


class IndexDocuments extends Component {
  render() {
    if (this.props.documents != 0) {

      return (
        <div className="index-documents">
          <h3>Liste des documents</h3>
          {this.props.documents.map((document) =>
          <div>
            <DetailsDocument key={document._id} document={document} />
            <AjouterImage document={document} />
            </div>
          )}
        </div>

      );

    } else {

      return (
        <div>
          <h3>pas de documents</h3>
        </div>
      )

    }


  }
}

export default IndexDocumentsContainer = withTracker((props) => {
  const documentsHandler = Meteor.subscribe('documents');
  const loading = !documentsHandler.ready();
  const documents = Documents.find({ chapitre: props.chapitre._id }).fetch()
  const documentsExists = !loading && !!documents;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : []
  }
})(IndexDocuments);