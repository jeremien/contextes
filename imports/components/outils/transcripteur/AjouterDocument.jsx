import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import Modal from 'react-responsive-modal';


export default class AjouterDocument extends Component {

    state = {
        open : false,
    };

    onOpenModal = () => {
        this.setState({
            open : true
        });
    }

    onCloseModal = () => {
        this.setState({
            open : false
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const commentaire = target.contentInput.value;
        // const auteur = Session.get('utilisateur');
        const auteur = this.props.utilisateur;
        const session = this.props.chapitre.session;
        const chapitre = this.props.chapitre._id;

        // console.log(commentaire, auteur, session, chapitre)

        Meteor.call('documents.insert', session, chapitre, commentaire, auteur)

        target.reset();
    }

    render() {
        // console.log('ajouter doc')
        // console.log(this.props);

        const { open } = this.state;
        
        return (
            <div className="ajout-commentaire">
                <form className="nouveau-commentaire" onSubmit={this.handleSubmit.bind(this)} >
                    <textarea
                        rows="15"
                        cols="60"
                        name="contentInput"
                        placeholder="Entrer le nouveau commentaire"
                    />
                    <br />
                    <input type="submit" value="Enregistrer" />
                </form>

                ou <button onClick={this.onOpenModal}>Distraction free modal</button> 

                <Modal open={open} onClose={this.onCloseModal} >
                    <p>temps : {this.props.chapitre.timer}</p>
                    <form className="nouveau-commentaire" onSubmit={this.handleSubmit.bind(this)} >
                        <textarea
                            rows="15"
                            cols="60"
                            name="contentInput"
                            placeholder="Entrer le nouveau commentaire"
                        />
                        <br />
                        <input type="submit" value="Enregistrer" />
                    </form>
                </Modal>

            </div>
        )
    }
}