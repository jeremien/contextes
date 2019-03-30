import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Documents } from '../../api/collections/documents';

import PageDocuments from '../outils/lecteur/PageDocuments';
import TableDocuments from '../outils/editeur/TableDocuments';

class IndexRefDocumentsContainer extends Component {

  render() {

    let { role } = this.props;

    if (this.props.documents.length !== 0) {

      if (this.props.role === 'editeur') {
        return (<div className='table-documents--container'>
            <TableDocuments  documents={this.props.documents} verrou={true} />
                </div>)

      } else {
        return (<div className='page-documents--container'>
            <PageDocuments {...this.props}  documents={this.props.documents} role={role} />
          </div>)

      }
   
    } else {

      return (
        <div>il n'y a pas de documents</div>
      )

    }
  }
}

export default IndexRefDocumentsContainer = withTracker((props) => {
  const documentsHandler = Meteor.subscribe('documents');
  const loading = !documentsHandler.ready();
  const documents = Documents.find( { chapitre: props.chapitre._id }, { sort: { ref : 1 }} ).fetch();
  const images = Documents.find({ chapitre: props.chapitre._id, type: "image" }, { fields: { image : 1 }} ).fetch();
  const documentsExists = !loading && !!documents;
  const imagesExists = !loading && !!document;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : [],
    imagesExists,
    images: imagesExists ? images : {}
  }
})(IndexRefDocumentsContainer);