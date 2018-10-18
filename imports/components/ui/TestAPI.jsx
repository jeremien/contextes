import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReactNotification from "react-notifications-component";




class TestAPI extends React.Component {





    render() {
      
        return (
            <div className="app-content">

                test
           
            </div>
        )
   
    }
}

export default TestAPI;