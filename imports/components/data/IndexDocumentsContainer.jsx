import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';
import { Images } from '../../api/collections/images';

import ListeDocuments from '../outils/ListeDocuments';

class IndexDocuments extends Component {

  render() {

    if (this.props.documents != 0) {

      return (<div className='listedocuments'>
            <ListeDocuments  documents={this.props.documents} />
          </div>)

    } else {

      return (
        <div>pas de documents</div>
      )

    }


  }
}

export default IndexDocumentsContainer = withTracker((props) => {
  const documentsHandler = Meteor.subscribe('documents');
  const loading = !documentsHandler.ready();
  const documents = Documents.find( { chapitre: props.chapitre._id }).fetch();
  const images = Documents.find({ chapitre: props.chapitre._id, type: "image" }, {fields: {image : 1}}).fetch();
  const documentsExists = !loading && !!documents;
  const imagesExists = !loading && !!document;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : [],
    imagesExists,
    images: imagesExists ? images : {}
  }
})(IndexDocuments);