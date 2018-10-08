import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import { Images } from '../../api/collections/images'

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
    }



    render() {

        
        return (
            <div>
                <h1>DDR Contexte</h1>
                <p> introduction </p>
                
                {/* <Link to="/sessions">Index des sessions</Link> */}
            </div>
        )
    }
}