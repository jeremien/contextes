import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Moment from 'react-moment'

import { renderBadges } from '../utils/badges';
export default class IndexSessions extends Component {

    handleSessionDelete(sessionId) {

        Meteor.call('sessions.remove', sessionId);

        let session = this.props.sessions.find((item) => {
            return item._id === sessionId;
        });

        let infos = {
            title: "message de l'éditeur",
            message: `suppression de la session : ${session.titre}`,
            type: "warning"
        };

        Meteor.call('notification', infos);
    }

    renderSessions() {

        let { role } = this.props;

        return this.props.sessions.map((item, key) => {
            
            let badges = renderBadges(this.props.badges, item._id);

            return (
                <div className='x jc bb py' key={key}>
                        
                       <p> N°{key + 1} </p>
                       <p className='cff'><Moment format='DD/MM/YYYY'>{item.creation}</Moment></p>
                        <p>{item.titre}</p>
                        <p className='cff'>{item.etat}</p>
                        <p> { badges ? badges : '0' } <span className='cff'>chapitres</span></p>
                        <p className='lk crs' onClick={() => this.props.history.push(`/sessions/${item._id}`) }>rejoindre</p>
                        { role === 'editeur' ? <p className='lk crs' onClick={() => this.handleSessionDelete(item._id)}>supprimer</p> : undefined }
               
                </div>
            )
        });
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

                    { this.props.sessions ? this.renderSessions() : 'pas de sessions' }

                </div>
            
            </section>
        )
    }
};