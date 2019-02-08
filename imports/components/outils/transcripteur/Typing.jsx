import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';



export default class Typing extends Component {

    render() {
        if (this.props.loading) {
            return <h3>Chargement</h3>
        }
        if (!!this.props.transcripteurs) {

            return (
                <ul className="typing">

                    {this.props.transcripteurs.map((transcripteur) => (
    
                            <li key={transcripteur._id}>
                               {transcripteur.username} est {transcripteur.typing ? <span>en train d'écrire</span> : <span>inactif</span>}
                            </li>
                        )
                    )}
                </ul>
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

