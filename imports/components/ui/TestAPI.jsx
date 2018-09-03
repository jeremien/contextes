import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Images } from '../../api/collections/images';

// import '/data'
// import '/upload'


class TestAPI extends React.Component {
    render() {
        if(this.props.images) {
            // {this.props.images.map((image) => (
            //     console.log( image.url())
            // ))}
        return (
            <div>
                <h1>TestAPI</h1>
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
                <p>Place images</p>
            </div>
        )
    }
    else {
        return <h2>Chargement</h2>
    }
    }
}

export default withTracker((props) => {
    Meteor.subscribe('images');
    return ({
        images: Images.find().fetch(),
    })
})(TestAPI);
