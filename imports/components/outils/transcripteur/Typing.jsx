import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';



export default class Typing extends Component {

    render() {
        if (this.props.loading) {
            return <h3>Chargement</h3>
        }
        if (!!this.props.transcripteurs) {

            return (
                <div className="x bb py">
                    
                    <ul className="typing ls reset">
                    {this.props.transcripteurs.map((transcripteur) => (
    
                            <li classname='' key={transcripteur._id}>
                               {transcripteur.username} : {transcripteur.typing ? <span className='fcr'>en train d'écrire</span> : <span>n'écrit pas</span>}
                            </li>
                        )
                    )}
                    </ul>
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

