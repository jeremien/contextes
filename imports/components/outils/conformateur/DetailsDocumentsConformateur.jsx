import React, { Component } from 'react'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal';
import ReactMde, { ReactMdeTypes } from 'react-mde'
import Showdown from 'showdown'

import { Documents } from '../../../api/collections/documents'

class DetailsDocumentsConformateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            revised: false,
            mdeState: {
                markdown: "",
            },
        };
        this.converter = new Showdown.Converter({ tables: true, simplifiedAutoLink: true });
    }

    handleValueChange(mdeState) {
        this.setState({ mdeState });
    }

    onOpenModal(document) {
        this.setState({
            open: true,
            mdeState: {
                markdown: document.contenu,
            },
        });
    }

    onCloseModal = () => {
        this.setState({
            open: false,
            revised: true
        })
    }

    render() {
        if (this.props.documentsExists) {
            return (

                <ul className="details-documents">
                    {this.props.documents.map((document) => (
                        <li key={document._id}>
                            <p>créé à {document.creation.toLocaleTimeString()} par {document.auteur}
                            </p>
                            <button onClick={(document) => {
                                this.setState({
                                    open: true,
                                    mdeState: {
                                        markdown: document.contenu,
                                    },
                                });
                            }}>Editer</button>
                            <Modal open={this.state.open} onClose={this.onCloseModal} >
                                <div className="container">
                                    <ReactMde
                                        layout="vertical"
                                        onChange={this.handleValueChange}
                                        editorState={this.state.mdeState}
                                    />

                                </div>
                            </Modal>
                        </li>
                    ))}

                </ul>

            )
        }
        else {
            return <h3>Chargement</h3>
        }

    }
}

export default withTracker((props) => {

    const documentsHandler = Meteor.subscribe('documents');
    const loading = !documentsHandler.ready();
    const documents = Documents.find({ chapitre: props.chapitre._id }).fetch();
    const documentsExists = !loading && !!documents;

    return {
        loading,
        documentsExists,
        documents: documentsExists ? documents : [{}]
    }

})(DetailsDocumentsConformateur);


