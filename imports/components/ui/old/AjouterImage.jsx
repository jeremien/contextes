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
        this.handleLoad = this.handleLoad.bind(this)
        this.fileInput = React.createRef();
        this.state = {
            toggleAjouterImage: true,
            url: "",
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
            // console.log('debut up')
            // console.log(upload)
        });

        upload.on('end', function (error, fileRef) {
            if (error) {
                alert('Error during upload: ' + error);
            } else {
                console.log(fileRef)
                alert('done');
            }
            // console.log('fin up')

        });
        upload.start();
    }

    handleLoad(event) {
        event.preventDefault();
        let self = this
        if (!!this.props.id) {
            Meteor.call('image.remove', this.props.id)
        }
        if (!!this.state.url) {
            Meteor.call('image.load', this.state.url, this.props.document, this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur)
            this.setState({ url: "" })
        }
    }

    ajoutDocument(image) {
        if (!!this.props.document) {
            // console.log(this.props.document.contenu)
            Meteor.call('documents.updateImage', this.props.document._id, this.props.document.contenu, image)
        }
        else {
            Meteor.call('documents.addImage', this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur, image)
            Meteor.call('log.insert', 'document', `${this.props.utilisateur} a ajouté une image`);
        }
    }

    render() {

        if (!this.props.simpleBtn) {

            return (

                <div className="ajouter-image">
                    <Switch
                        defaultChecked={this.state.toggleAjouterImage}
                        onChange={() => this.setState({ toggleAjouterImage: !this.state.toggleAjouterImage })}
                        style={{ marginBottom: '20px' }}
                    />

                    {this.state.toggleAjouterImage &&
                        <div>
                            <Upload.Dragger data={this.handleSubmit}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                            </Upload.Dragger>

                            <form className="url-image" onSubmit={this.handleLoad}>
                                <input className="url" value={this.state.url} onChange={(event) => { this.setState({ url: event.target.value }) }} />
                                <button type="submit" value="submit" placeholder="envoyer" />
                            </form>
                        </div>
                    }
                </div>
            )

        } else {

            return (
                    <div>
                        <Upload name='upload file' data={this.handleSubmit} listType='picture'>
                            <Button>
                                <Icon type='upload' /> Ajouter ou modifier une image 
                            </Button>
                    </Upload>
                </div>
            )

        }

    }
}