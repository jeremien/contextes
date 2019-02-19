import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Moment from 'react-moment'

import { renderBadges } from '../utils/badges';
export default class IndexSessions extends Component {

    handleSessionDelete(sessionId) {

        if (this.props.badges.length === 0) {

            Meteor.call('sessions.remove', sessionId);

            let session = this.props.sessions.find((item) => {
                return item._id === sessionId;
            });

            let notification = {
                titre: this.props.utilisateur,
                message: `suppression de la session ${session.titre}`,
            };

            Meteor.call('notification', notification);

        } else {

            alert('la session contient des chapitres');

        }
       
    }

    renderSessions() {

        if (this.props.sessions.length != 0) {

            let { role } = this.props;

            return this.props.sessions.map((item, key) => {
            
                let badges = renderBadges(this.props.badges, item._id);

                return (
                    <div className='x jc bb py' key={key}>
                            
                        <p> N°{key + 1} </p>
                        <p className='cff'><Moment format='DD/MM/YYYY'>{item.creation}</Moment></p>
                            <p>{item.titre}</p>
                            <p>{item.auteur}</p>
                            <p className='cff'>{item.etat}</p>
                            <p> { badges ? badges : 'pas de' } <span className='cff'>chapitre(s)</span></p>
                            <p className='lk crs' onClick={() => this.props.history.push(`/sessions/${item._id}`) }>rejoindre</p>
                            { role === 'editeur' ? <p className='lk crs' onClick={() => this.handleSessionDelete(item._id)}>supprimer</p> : undefined }
                
                    </div>
                )
            });
        
        } else {

            return <p>il n'y a pas de sessions</p>
        }

        
    }
  
    render() {
        
        return (

            <section className='x xw fsc'>

                { this.props.role === 'editeur' &&

                    <div id='indexsession--form' className='br py px'>

                        {this.props.action}

                    </div>
            
                }

                <div id='indexsession--liste' className='py px'>

                   { this.renderSessions() }

                </div>
            
            </section>
        )
    }
};