import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AjouterSession extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titre : '',
            description : '',
            localisation : '',
            institution : '',
            password : '',
            alert : undefined
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }

    handleInput(e) {
        const t = e.target;
        const value = t.value;
        const name = t.name

        this.setState({
            [name] : value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const auteur = this.props.utilisateur || inconnu;
        const { titre, description, localisation, institution, password } = this.state;

        if (titre && description && localisation && institution) {

            Meteor.call('sessions.insert', titre, auteur, description, localisation, institution, password);
            
            this.setState({ 
                titre: '',
                description: '',
                localisation : '',
                institution : '',
                password : '',
                alert : 'session créée'
            });
            
            let infos = {
                titre : auteur,
                message : `a créé.e la session ${this.state.titre}`
            };

            Meteor.call('notification', infos);

        } else {

            this.setState({
                alert : 'Remplissez le formulaire'
            })
            
        }

    }

    render() {

        let { titre, description, localisation, institution, password, alert } = this.state;

        if (this.props.connecte) {
            return (
                <form className='ajoutersession' onSubmit={this.handleSubmit}>
                    
                    <input 
                        className='btt reset py px mb'
                        type='text' 
                        name='titre' 
                        value={titre} 
                        onChange={this.handleInput} 
                        placeholder='titre de la session'
                    />
                    <textarea 
                        className='wfull txta py px btt fsc mb'
                        name='description'
                        value={description}
                        onChange={this.handleInput}
                        placeholder='description'
                    />
                    <textarea 
                        className='wfull txta py px btt fsc mb'
                        name='localisation'
                        value={localisation}
                        onChange={this.handleInput}
                        placeholder='localisation'
                    />
                     <textarea 
                        className='wfull txta py px btt fsc mb'
                        name='institution'
                        value={institution}
                        onChange={this.handleInput}
                        placeholder='éditeur'
                    />
                      {/* <input 
                        className='btt reset py px mb'
                        type='text' 
                        name='password' 
                        value={password} 
                        onChange={this.handleInput} 
                        placeholder='mot de passe'
                    />     */}

                    <p>{alert}</p>     

                    <input className='wfull fsc btt py px crs' type='submit' value='enregistrer'/>  

                </form>
            )
        } else {
            return <p>Vous devez être connecté.e</p>
        }
    }

} 

