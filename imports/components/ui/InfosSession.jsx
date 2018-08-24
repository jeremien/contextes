import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'
/**
 * Permet l'affichage des méta-data et propriétés d'une session.
 * La session en question doit être passée directement en props
 */
export default class InfosSession extends Component {
    // static propTypes = {
    //     session: PropTypes.isRequired,
    // };

    // static defaultProps = {
    //     session: {},
    // };

    render() {
        console.log(this.props.session)
        return (
            <div>
                
                <p>auteur : {this.props.session.auteur}</p>
                <p>date de création : {this.props.session.creation.toLocaleDateString()}</p>
                <p>dernière modification : {this.props.session.lastModified.toLocaleDateString()}</p>
                <p>description : {this.props.session.description}</p>

            </div>
        )
    }
}