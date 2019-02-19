import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'
import { Images } from '../../../api/collections/images'
import { Documents } from '../../../api/collections/documents'

export default class AjouterImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            file: null
        }


        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleLoad = this.handleLoad.bind(this)

        this.onFileChange = this.onFileChange.bind(this);
        this.onFileSubmit = this.onFileSubmit.bind(this);

        // this.fileInput = React.createRef();
      
    }

    /**
     * Méthode à ajouter dans la props data pour uploader
     */

    onFileSubmit(e) {
        e.preventDefault();

        // console.log(this.state.file)
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
            // console.log(upload)
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
                console.log(fileRef)
                // alert('done');
            }

        });
        upload.start();
    }

    // handleLoad(event) {
        
    //     event.preventDefault();
        
    //     let self = this

    //     if (!!this.props.id) {
    //         Meteor.call('image.remove', this.props.id);
    //     }
    //     if (!!this.state.url) {
    //         Meteor.call('image.load', this.state.url, this.props.document, this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur);
    //         this.setState({ url: "" })
    //     }
    // }

    ajoutDocument(image) {
        if (!!this.props.document) {
            Meteor.call('documents.updateImage', this.props.document._id, this.props.document.contenu, image);
        }
        else {
            Meteor.call('documents.addImage', this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur, image);
        }
    }

    render() {

       return (

        <div className='ajouterimage'>
            
            <form  className='' onSubmit={this.onFileSubmit}>
               
                <input  type='file' ref='fileinput' onChange={this.onFileChange} />
                <input className='wfull fsc btt py px crs' type="submit" value="enregistrer" placeholder="envoyer" />

            </form>

            {/* <form className="url-image" onSubmit={this.handleLoad}>
                <input className="url" value={this.state.url} onChange={(event) => { this.setState({ url: event.target.value }) }} />
                <input className='wfull fsc btt py px crs' type="submit" value="enregister" />
            </form> */}

        </div>
       )

    }
}