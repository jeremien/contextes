import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import { Images } from '../../../api/collections/images'
import { Documents } from '../../../api/collections/documents'

export default class AjouterImage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        let self = this

        event.preventDefault();
        const upload = Images.insert({
            file: this.fileInput.current.files[0],
            streams: 'dynamic',
            chunkSize: 'dynamic',
            onUploaded: (error, fileRef) => self.ajoutDocument(fileRef),
        }, false);
        upload.on('start', function () {
            console.log('debut up')
            console.log(upload)
        });

        upload.on('end', function (error, fileRef) {
            if (error) {
                alert('Error during upload: ' + error);
            } else {
                console.log(fileRef)
                alert('done');
            }
            console.log('fin up')

        });
        upload.start();
    }

    ajoutDocument(image) {
        if (!!this.props.document) {
            Meteor.call('documents.updateImage', this.props.document._id, image)
        }
        else {
            Meteor.call('documents.addImage', this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur, image)
        }
    }

    render() {
        return (

            <ul className="ajouter-image">
                <li>
        <h3>Ajouter une image {!!this.props.document && "au document"}</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Upload file:
                            <input id="fileinput" type="file" ref={this.fileInput} />
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </li>
            </ul>
        )
    }
}