import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
/**
 * Permet l'affichage des méta-data et propriétés d'une session.
 * La session en question doit être passée directement en props
 */
export default function InfosSession(props) {

    return (
        <div>
            <p>auteur : {props.session.auteur}</p>
            <p>date de création : {props.session.creation.toLocaleDateString()}</p>
            <p>dernière modification : {props.session.lastModified.toLocaleDateString()}</p>
            <p>description : {props.session.description}</p>
        </div>
    )

}