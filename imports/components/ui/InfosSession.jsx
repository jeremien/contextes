import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Card } from 'antd';

/**
 * Permet l'affichage des méta-data et propriétés d'une session.
 * La session en question doit être passée directement en props
 */



export default function InfosSession(props) {

    // console.log(props)

 
    return (

        <Card title={props.session.titre} style={{ marginBottom:'20px' }}>
            <p>auteur : {props.session.auteur}</p>
            <p>date de création : {props.session.creation.toLocaleDateString()}</p>
            <p>dernière modification : {props.session.lastModified.toLocaleDateString()}</p>
            <ul>catégories : {props.session.categories.map((item, key) => <li key={key}>{item}</li>)}</ul>
        </Card>

        // <div width="100%">
        //     <p>titre : {props.session.titre}</p>
        //     <p>auteur : {props.session.auteur}</p>
        //     <p>date de création : {props.session.creation.toLocaleDateString()}</p>
        //     <p>dernière modification : {props.session.lastModified.toLocaleDateString()}</p>
        // </div>
    )

}