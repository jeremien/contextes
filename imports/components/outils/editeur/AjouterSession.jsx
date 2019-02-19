import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AjouterSession extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titre : '',
            description : '',
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
        const { titre, description, password } = this.state;

        if (titre && description) {

            Meteor.call('sessions.insert', titre, auteur, description, password);
            
            this.setState({ 
                titre: '',
                description: '',
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
                alert : 'Remplissez le titre et la description'
            })
            
        }

    }

    render() {

        let { titre, description, password, alert } = this.state;

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
                      <input 
                        className='btt reset py px mb'
                        type='text' 
                        name='password' 
                        value={password} 
                        onChange={this.handleInput} 
                        placeholder='mot de passe'
                    />    

                    <p>{alert}</p>     

                    <input className='wfull fsc btt py px crs' type='submit' value='enregistrer'/>  

                </form>
            )
        } else {
            return <p>Vous devez être connecté.e</p>
        }
    }

} 

