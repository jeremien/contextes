import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';



export default class Typing extends Component {

    render() {
        if (this.props.loading) {
            return <h3>Chargement</h3>
        }
        if (!!this.props.transcripteurs) {

            return (
                <div className="typing">

                    <h3>Transcritpeurs connectées</h3>

                    {this.props.transcripteurs.map((transcripteur) => (
    
                            <li key={transcripteur._id}>
                               {transcripteur.utilisateur} : {transcripteur.typing ? <span>En train d'écrire</span> : <span>Inactif</span>}
                            </li>
                        )
                    )}
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

