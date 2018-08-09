import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'

export default function ConnexionsCourantes(props) {
    return (
        <div className="liste-connectes">
            <ul>
                {props.connexions.map((connexion) => (
                    <li>connexion.utilisateur</li>
                ))}
            </ul>
        </div>
    )
}