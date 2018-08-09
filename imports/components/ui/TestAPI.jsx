import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

import { Connexions } from '../../api/collections/connexions';


class TestAPI extends React.Component {
    render() {
        console.log(this.props.connexions)
        return (
            <div>
                <h1>TestAPI</h1>
                <h3>Utilisateur</h3>
                {this.props.connexions.map((connexion) => (
                    <div key={connexion._id}>
                    <h3>Utilisateur : {connexion.utilisateur}</h3>
                        
                        <button onClick={() => Meteor.call('message.client', connexion.socket)}>Test message à : {connexion.utilisateur}</button>
                    </div>
                    
                ))}
                
            </div>
        )
    }
}

// function logProps(WrappedComponent) {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//             this.state = {
//                 connecte: false,
//                 role: "",
//             };
//         }

//       render() {
//         return (
//             <WrappedComponent {...this.state}>
//             <p>HOC ok</p>
//             </WrappedComponent>
//         );
//       }
//     }
//   }


export default withTracker((props) => {
    Meteor.subscribe('connexions');
    return ({
        connexions: Connexions.find().fetch(),
    })
})(TestAPI);
