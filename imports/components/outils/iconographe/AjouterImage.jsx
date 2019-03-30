import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Images } from '../../../api/collections/images'

export default class AjouterImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            file: null,
            isLoading : false,
            messageFile : null,
            messageUrl : null
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.onFileSubmit = this.onFileSubmit.bind(this);
        this.onUrlSubmit = this.onUrlSubmit.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
      
    }

    /**
     * Méthode à ajouter dans la props data pour uploader
     */

    onUrlSubmit(e) {
        e.preventDefault();

        let validUrl = new RegExp(/^(?:http(s)?:\/\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)

        if (this.state.url) {

            if (validUrl.test(this.state.url)) {
                Meteor.call('documents.addImageUrl', this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur, this.state.url);
                this.setState({
                    url : "",
                    messageUrl : null
                });
                let notification = { titre : this.props.utilisateur, message : "j'ajoute une image depuis une url" }
                Meteor.call('notification', notification);
            } else {
                this.setState({
                    messageUrl : "ajouter une url valide"
                });
            }

            
        } else {
            this.setState({
                messageUrl : "ajouter l'url de l'image"
            });
        }

    }

    onUrlChange(e) {
        this.setState({
            url : e.target.value
        })
    }

    onFileSubmit(e) {
        e.preventDefault();

        if (this.state.file !== null) {
            this.fileUpload(this.state.file);
            let notification = { titre : this.props.utilisateur, message : "j'ajoute une image" }
            Meteor.call('notification', notification);
            this.setState({
                messageFile : ""
            });
        } else {
            this.setState({
                messageFile : "ajouter une image"
            });
        }
        
    }

    onFileChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    fileUpload(file) {

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
            self.setState({
                isLoading : true
            })
        });

        upload.on('uploaded', function(error, fileRef) {
            self.refs['fileinput'].value = '';
            self.setState({
                file: null,
                isLoading: false
            });
        });

        upload.on('end', function (error, fileRef) {
            if (error) {
                alert('Error during upload: ' + error);
            } else {
                console.log('end')
            }

        });
        upload.start();
    }


    ajoutDocument(image) {

        Meteor.call('documents.addImage', this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur, image._id);
        
    }

    render() {

        if (this.props.chapitre.isOpen) {

            return (

                <div className='ajouterimage'>
                    
                    <p>enregistrer une image depuis l'ordinateur</p>
                    <form  onSubmit={this.onFileSubmit}>
                       
                        <input  type='file' ref='fileinput' onChange={this.onFileChange} />
                        
                        { this.state.messageFile ? <p className="fcr">{this.state.messageFile}</p> : undefined }
                        { this.state.isLoading ? <p>chargement en cours</p> : undefined}
        
                        <input className='wfull fsc btt py px crs txta mt' type="submit" value="enregistrer" placeholder="envoyer" />
        
                    </form>
        
                    <p>enregistrer une image depuis une url</p>
                    <form className="mt" onSubmit={this.onUrlSubmit} >
        
                        <input className="btt reset py px mb txta" value={this.state.url} type='text' onChange={this.onUrlChange}/>
                        { this.state.messageUrl ? <p className="fcr">{this.state.messageUrl}</p> : undefined }
                        <input className='wfull fsc btt py px crs txta mt' type="submit" value="enregistrer" placeholder="envoyer" />
        
                    </form>
                </div>
               )

        } else {
           return <p>le chapitre est fermé</p> 
        }

    }
}