import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import { createConnection } from 'net';

// export default function ConnexionsCourantes(props) {
//     console.log(props)
//     return (
//         <div className="liste-connectes">
//             <ul>
//                 {props.connexions.map((connexion) => (
                    
//                     <li key={connexion._id}>
//                         {connexion.utilisateur} ({connexion.role}) : {connexion.online ? <p>online</p> : <p>offline</p>}                    
                        
                        
//                             <button onClick={(event) => 
//                             Meteor.call('message.client', connexion.socket, 'logoutForce')
//                             }>Ejecter</button>
                        
                    
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

class ConnexionsCourantes extends Component {

    render() {

        // console.log(this.props)

        if (this.props.connexions.length != 0) {

            return (
                <div className="connexions">
                    {this.props.connexions.map((connexion) => (
    
                            <li key={connexion._id}>
                               {connexion.utilisateur} ({connexion.role}) : {connexion.online ? <span>online</span> : undefined }
                               {this.props.role === "editeur" ?  <button onClick={(event) => Meteor.call('message.client', connexion.socket, 'logoutForce') }>Ejecter</button> : undefined }
                            </li>
                        )
                    )}
                </div>
            )

        } else {

            return (

                <div className="connexions">
                    <p>pas de connexions</p>
                </div>

            )

        }

        

    }

}

export default ConnexionsCourantes;