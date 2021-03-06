import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import { createConnection } from 'net';



class ConnexionsCourantes extends Component {

    render() {

        if (this.props.loading) {
            return <h3>Chargement</h3>
        }
        if (this.props.connexionsExists) {

            return (
                <div className="connexions">

                    <p>Il y a 0 personnes connectées</p>

                    { this.props.connexions.map((connexion) => {

                        return (
                            <li key={connexion._id}>
                               {connexion.username} ({connexion.role}) : {connexion.online ? "online" : "offline" }
                               {/* {this.props.role === "editeur" ?  <button onClick={(event) => Meteor.call('ejection.client', connexion._id, connexion.socketId, connexion.online) }>Ejecter</button> : undefined } */}
                            </li>
                        )

                    })}
                </div>
            )

        } else {

            return (

                <div className="connexions">
                    <p>Pas de connexions</p>
                </div>

            )

        }

        

    }

}

export default ConnexionsCourantes;