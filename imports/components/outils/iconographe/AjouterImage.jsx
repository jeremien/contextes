import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Images } from '../../../api/collections/images'

export default class AjouterImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            file: null
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.onFileSubmit = this.onFileSubmit.bind(this);
      
    }

    /**
     * Méthode à ajouter dans la props data pour uploader
     */

    onFileSubmit(e) {
        e.preventDefault();

        this.fileUpload(this.state.file);
        let notification = { titre : this.props.utilisateur, message : "j'ajoute une image" }
            Meteor.call('notification', notification);
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
        });

        upload.on('uploaded', function(error, fileRef) {
            self.refs['fileinput'].value = '';
            self.setState({
                file: null
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

       return (

        <div className='ajouterimage'>
            
            <form  className='' onSubmit={this.onFileSubmit}>
               
                <input  type='file' ref='fileinput' onChange={this.onFileChange} />
                <input className='wfull fsc btt py px crs' type="submit" value="enregistrer" placeholder="envoyer" />

            </form>

        </div>
       )

    }
}