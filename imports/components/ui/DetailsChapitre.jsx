import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ConnexionsCourantes from '../outils/ConnexionsCourantes';

export default class DetailsChapitre extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
        }

    }

    componentWillUnmount() {
        Meteor.call('connexions.offline', this.props.userId);
    };

    // Méthode à changer avec willMount/update selon l'endroit où sera définie la route
    componentDidMount() {
        if (this.props.connecte && this.props.chapitreExists) {
            Meteor.call('connexions.chapitre', this.props.userId, this.props.chapitre.session, this.props.chapitre._id);
        }

    };


    render() {

        if (!!this.props.connecte && this.props.chapitreExists) {

            return (
                <section className='x xw fsc'>

                        <div id='detailschapitre--gauche' className='br py px'>

                            {this.props.outils.outilgauche}

                        </div>


                        <div id='detailschapitre--droit' className='py px'>

                            {this.props.outils.outildroit}
                        
                        </div>


                </section>
            )

        } else {

            return (

                <div>pas de documents</div>
            )
        }

    }

}