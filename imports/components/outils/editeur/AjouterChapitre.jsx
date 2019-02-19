import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AjouterChapitre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            description: '',
            alert: undefined
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

    handleSubmit(event) {
        
        event.preventDefault();

        const auteur = this.props.utilisateur;
        const { titre, description} = this.state;

        const session = this.props.session._id;

        if (titre && description) {

            console.log('auteur', auteur, 'description', description)

            Meteor.call(
                'chapitres.insert',
                session,
                titre,
                auteur,
                description,
                );

            let notification = {
                titre: auteur,
                message: `a créé.e le chapitre ${titre}`,
            }

            Meteor.call('notification', notification);

            this.setState({
                titre: '',
                description: '',
                alert : 'chapitre créé'
            });

        } else {

            this.setState({
                alert : 'Remplissez le titre et la description'
            })

        }
    }

  

    render() {

        let { titre, description, alert } = this.state;

        return (

            <form className='ajouter-chapitre' onSubmit={this.handleSubmit}>
                    
            <input 
                className='btt reset py px mb'
                type='text' 
                name='titre' 
                value={titre} 
                onChange={this.handleInput} 
                placeholder='titre du chapitre'
            />
            <textarea 
                className='wfull txta py px btt fsc mb'
                name='description'
                value={description}
                onChange={this.handleInput}
                placeholder='description'
            />

            <p>{alert}</p>     

            <input className='wfull fsc btt py px crs' type='submit' value='enregistrer'/>  

        </form>
          
        )
    }
}