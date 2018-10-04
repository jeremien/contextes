import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import { Images } from '../../api/collections/images'

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert(
        //     `Selected file - ${
        //     this.fileInput.current.files[0].name
        //     }`
        // );
        // FS.Utility.eachFile(event, function(file) {
        //     Images.insert(file, function (err, fileObj) {
        //       // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        //     });
        //   });
        const upload = Images.insert({
            file: this.fileInput.current.files[0],
            streams: 'dynamic',
            chunkSize: 'dynamic',
            onUploaded: (error, fileRef) => alert(fileRef),
        }, false);
        upload.on('start', function () {
            console.log('debut up')
        });

        upload.on('end', function (error, fileObj) {
            if (error) {
                alert('Error during upload: ' + error);
            } else {
                alert(upload);
            }
            console.log('fin up')
        });

        upload.start();
        console.log(upload)
    }

    render() {

        
        return (
            <div>
                <h1>DDR Contexte</h1>
                <p> introduction </p>
                
                <Link to="/sessions">Index des sessions</Link>
            </div>
        )
    }
}