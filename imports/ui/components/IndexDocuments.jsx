import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Documents } from '../../api/collections/documents';
import { withTracker } from 'meteor/react-meteor-data';


class IndexDocuments extends Component {

  render() {
    return (
      <div className="index-documents">
        <h3>Liste des documents</h3>
      </div>

    );
  }
}

export default IndexDocumentsContainer = withTracker((props) => {
  const documentsHandler = Meteor.subscribe('documents');
  const loading = !documentsHandler.ready();
  const documents = Documents.find({ chapitre: props.chapitreId }).fetch()
  const documentsExists = !loading && !!documents;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : []
  }
})(IndexDocuments);