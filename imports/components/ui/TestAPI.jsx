import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReactNotification from "react-notifications-component";

// import { Images } from '../../api/collections/images';

// import '/data'
// import '/upload'




class TestAPI extends React.Component {

    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {

        this.props.socket.on('notification', (message) => {
            console.log('notification', message)
            this.notificationDOMRef.current.addNotification({
                title: "Awesomeness",
                message,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 2000 },
                dismissable: { click: true }
            });
        });

    }



    render() {
        // if(this.props.images) {
        // {this.props.images.map((image) => (
        //     console.log( image.url())
        // ))}
        return (
            <div className="app-content">
                <ReactNotification ref={this.notificationDOMRef} />
                {/* <h1>TestAPI</h1>
                {this.props.images.map((image) => (
                    <div key={image._id}>
                        <a href={`/${image._id}.${image.ext}`} target="_blank">
                            <img
                                src={`/${image._id}.${image.ext}`}
                                alt="une image" 
                                className="thumbnail"
                            />
                        </a>
                    </div>
                ))}
                <p>Place images</p> */}
            </div>
        )
        //     }
        //     else {
        //         return <h2>Chargement</h2>
        //     }
    }
}

export default TestAPI;