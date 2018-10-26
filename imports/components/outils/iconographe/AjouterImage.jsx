import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'
import { Images } from '../../../api/collections/images'
import { Documents } from '../../../api/collections/documents'

import { Upload, Icon, message, Button, Switch } from 'antd';

export default class AjouterImage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state={
            toggleAjouterImage: true,
        }
    }

    /**
     * Méthode à ajouter dans la props data pour uploader
     */
    handleSubmit(file) {
        let self = this
        if (!!this.props.id) {
            Meteor.call('image.remove', this.props.id)
        }
        
        const upload = Images.insert({
            file: file,
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

            <div className="ajouter-image">
                <Switch
                    defaultChecked={this.state.toggleAjouterImage}
                    onChange={() => this.setState({ toggleAjouterImage: !this.state.toggleAjouterImage })}
                    style={{ marginBottom: '20px' }}
                />

                {this.state.toggleAjouterImage &&
                <Upload.Dragger data={this.handleSubmit}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Upload.Dragger>
                }
            </div>
        )
    }
}