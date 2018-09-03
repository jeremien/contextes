import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import { Images } from '../../../api/collections/images'
import { Documents } from '../../../api/collections/documents'

export default class DetailsDocumentsCorrecteur extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({
            open: true
        });
    }

    onCloseModal = () => {
        this.setState({
            open: false,
            revised: true
        })
        // update texte corrigé
    }


    handleChange(event) {
        this.setState({ contenu: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const upload = Images.insert({
            file: this.fileInput.current.files[0],
            streams: 'dynamic',
            chunkSize: 'dynamic',
            onUploaded: (error, fileRef) => Meteor.call('documents.addImage', this.props.document._id, 'image'),
            // onUploaded: (error, fileRef) => console.log(fileRef)
        }, false);
        upload.on('start', function () {
            console.log('debut up')
            console.log(upload)
        });

        upload.on('end', function (error, fileObj) {
            if (error) {
                alert('Error during upload: ' + error);
            } else {
                // Meteor.call('documents.addImage', this.props.document._id, upload)
                alert('done');
            }
            console.log('fin up')
            
        });
        upload.start();
        // this.setState = ({ open: false })
    }

    render() {
        const { open } = this.state;
        return (
            <ul className="details-documents">
                <li>
                    <button onClick={this.onOpenModal}>Ajotuer une image à ce commentaire ({this.props.document.contenu}</button>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Upload file:
                            <input type="file" ref={this.fileInput} />
                            </label>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    {/* <Modal open={open} onClose={this.onCloseModal} >
                        
                    </Modal> */}
                </li>
            </ul>
        )
    }
}