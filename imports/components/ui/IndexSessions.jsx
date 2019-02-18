import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class IndexSessions extends Component {
    
    constructor(props) {
        super(props)
    }

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
            
            return (
                <div className='x jc bb py' key={key}>
                        
                       <p> N°{key + 1} </p>
                        <p>{item.titre}</p>
                        {/* <p>{item.description}</p> */}
                        {/* <p>{item.auteur}</p> */}
                        {/* <p>{item.creation.toString()}</p> */}
                        <p>{item.etat}</p>
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