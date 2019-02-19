import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Chapitres } from '../../api/collections/chapitres'

import AjouterChapitre from '../outils/editeur/AjouterChapitre';

import InfosSessions from './InfosSession';

class TableauDeBord extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            etat: this.props.session.etat
        }

        this.handleEtat = this.handleEtat.bind(this);
    }
    

    handleEtat(event) {
        
        Meteor.call('sessions.etat.update', this.props.session._id, event.target.value)

        let notification = {
            titre: this.props.utilisateur,
            message: `j'ai changé.e le statut de la session ${this.props.session.titre} en ${event.target.value}`          }
      
        Meteor.call('notification', notification);
    }

    render() {

        if (!this.props.loading) {

            return (
                <div className='tableaudebord'>
                
                    <InfosSessions session={this.props.session} />

                    <form className='mb'>
                        <select name="statut" value={this.props.session.etat} onChange={this.handleEtat}>
                            <option value='edition'>edition</option>
                            <option value='completee'>completee</option>
                            <option value='archivee'>archivee</option>
                        </select>
                    </form>

                    <AjouterChapitre {...this.props} />

                </div>
            )
            
        }

        else {

            return <p>chargement en cours</p>
        }
    }
}

export default TableauDeBordContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres', {session: props.session._id});
    const loading = !chapitresHandle.ready()
    const chapitres = Chapitres.find({ session: props.session._id }).fetch();
    const chapitresExists = !loading && !!chapitres;
    return {
        loading,
        chapitresExists,
        chapitres: chapitresExists ? chapitres : [],
    }
})(TableauDeBord);