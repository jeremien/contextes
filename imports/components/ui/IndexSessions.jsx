import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Moment from 'react-moment'
import { renderBadges } from '../utils/badges';
export default class IndexSessions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modifier : false,
            id : '',
            titre : '',
            description : '',
            auteur : '',
            localisation : '',
            institution : ''
        }

        this.handleModifier = this.handleModifier.bind(this);
        this.handleSessionDelete = this.handleSessionDelete.bind(this);
        this.submitModif = this.submitModif.bind(this);
    }

    handleSessionDelete(sessionId, badges) {

        if (!badges) {

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

    handleModifier(id) {
        
        let session = this.props.sessions.filter((item) => {
            return item._id === id;
        });

        let { _id, titre, description, auteur, localisation, institution } = session[0];
        
        this.setState({
            modifier : !this.state.modifier,
            id : _id,
            titre : titre,
            description : description,
            auteur : auteur,
            localisation : localisation,
            institution : institution
        });
    }

    submitModif(e) {
        e.preventDefault();
        let { titre, description, auteur, localisation, institution } = this.state;
        Meteor.call('sessions.update.index', this.state.id, { titre, description, auteur, localisation, institution });
        this.setState({
            modifier : false
        });
    }

    renderSessions() {

        if (this.props.sessions.length != 0) {

            let { role } = this.props;

            return this.props.sessions.map((item, key) => {
            
                let badges = renderBadges(this.props.badges, item._id);

                return (
                    <div className='x jc bb py txta' key={key}>
                            
                        <p> N°{key + 1} </p>
                        <p className='cff'><Moment format='DD/MM/YYYY'>{item.creation}</Moment></p>
                        <p>{item.titre}</p>
                        <p>{item.auteur}</p>
                        <p className='cff'>{item.etat}</p>
                        <p> { badges ? badges : 'pas de' } <span className='cff'>chapitre(s)</span></p>
                        
                        { role === 'editeur' ? <button className="btt bcbb bg cfbl py txta" onClick={() => { 
                                this.handleModifier(item._id) 
                            }}>modifier</button> : undefined }
                         
                        <button className="btt bcg bg cfgr py txta" onClick={() => this.props.history.push(`/sessions/${item._id}`) }>rejoindre</button>
                        
                        { role === 'editeur' ? <button className="btt bcr bg fcr py txta" onClick={() => {
                                this.handleSessionDelete(item._id, badges)
                            }}>supprimer</button> : undefined }
            
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
                    <p>Index des sessions</p>
                    { this.state.modifier ? <form onSubmit={this.submitModif}>
                                                <input type="texte" value={this.state.titre} onChange={(e) => this.setState({ titre : e.target.value })}/>
                                                <input type="texte" value={this.state.description} onChange={(e) => this.setState({ description : e.target.value })}/>
                                                <input type="texte" value={this.state.auteur} onChange={(e) => this.setState({ auteur : e.target.value })}/>
                                                <input type="texte" value={this.state.localisation} onChange={(e) => this.setState({ localisation : e.target.value })}/>
                                                <input type="texte" value={this.state.institution} onChange={(e) => this.setState({ institution : e.target.value })}/>
                                                <input type="submit" value="valider" />
                                            </form> 
                                            : undefined}
                    { this.renderSessions() }
                </div>         
            </section>
        )
    }
};

