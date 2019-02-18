import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Form, Input, Button, message } from 'antd';

const { TextArea } = Input;

export default class AjouterDocument extends Component {

    constructor(props) {

        super(props);

        this.state = {
            commentaire: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const auteur = this.props.utilisateur;
        const session = this.props.chapitre.session;
        const chapitre = this.props.chapitre._id;

        if (this.state.commentaire) {

            Meteor.call('documents.insert', session, chapitre, this.state.commentaire, auteur)

            this.setState({
                commentaire: ''
            });

        } else {

           alert('Écrivez un texte!');

        }

    }

    handleChange(event) {
        this.setState({ commentaire: event.target.value })
    }

    render() {

         let { commentaire } = this.state;

        return (

            <form className='ajouterdocument' onSubmit={this.handleSubmit}>

                <textarea 
                    value={commentaire}
                    placeholder='texte'
                    rows='5'
                    onChange={this.handleChange}
                    onBlur={() => { Meteor.call('connexions.ecrit.pas', this.props.userId) }}
                    onFocus={() => { Meteor.call('connexions.ecrit', this.props.userId) }}
                />

                <input type='submit' value='enregistrer'/>

            </form>
        )
    }
}