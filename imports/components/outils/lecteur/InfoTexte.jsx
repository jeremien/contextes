import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Documents } from '../../../api/collections/documents';

class InfoTexte extends Component {

    constructor(props) {
        super(props);

    }

    renderNbrDocs(valid) {
        let accept = [];
        let refused = [];

        this.props.documents.forEach((element) => {
            if (element.rejete) {
                refused.push(element);
            } else {
                accept.push(element);
            }
        });

        if (valid) {
            return accept.length;
        } else {
            return refused.length;
        }
    }

    renderNbrDocsCorr() {
        let corr = [];
        this.props.documents.forEach((item) => {
            if (item.correction) {
                corr.push(item.contenu);
            }
        });
        return corr.length;
    }

    renderNbrCaracters(total) {
        let text = [];
        let textRest = [];

        this.props.documents.forEach((item) => {
            text.push(item.contenu);
            if (!item.rejete) {
                textRest.push(item.contenu);
            }
        });
        if (total) {
            return text.join().length;
        } else {
            return textRest.join().length;
        }
        
    }

    renderNbrImages(total) {
        let images = [];
        let imagesRest = [];
        this.props.documents.forEach((element) => {
            if (element.image !== null) {
                images.push(element.image);
                if (!element.rejete) {
                    imagesRest.push(element.image);
                }
            }
        });
        if (total) {
            return images.length;
        } else {
            return imagesRest.length;
        }
    }

    renderNbrAuthor() {
        let data = [];
        this.props.documents.forEach((element) => {
            data.push(element.auteur);
        });
        let authors = [...new Set(data)];
        return <span>{authors.join(', ')}</span>;
    }

    render() {

        return ( 
            <div>
                <p>documents : {this.props.documents.length}</p>
                <p>documents corrigés : {this.renderNbrDocsCorr()}</p>
                <p>documents acceptés : {this.renderNbrDocs(true)}</p>
                <p>documents rejetés : {this.renderNbrDocs(false)}</p>
                <p>images : {this.renderNbrImages(true)}</p>
                <p>images restantes : {this.renderNbrImages(false)}</p>
                <p>caractères : {this.renderNbrCaracters(true)} </p>
                <p>caractères restants : {this.renderNbrCaracters(false)} </p>
                <p>auteur.rices : {this.renderNbrAuthor()}</p>
            </div>
            
        )
    }
}

export default InfoTexte = withTracker((props) => {
    const documentsHandler = Meteor.subscribe('documents');
    const loading = !documentsHandler.ready();
    const documents = Documents.find( { chapitre: props.chapitre._id }, { sort: { ref : 1 }} ).fetch();
    const documentsExists = !loading && !!documents;
    return {
      loading,
      documentsExists,
      documents: documentsExists ? documents : []
    }
  })(InfoTexte);