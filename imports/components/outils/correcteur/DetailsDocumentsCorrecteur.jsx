import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';

export default class DetailsDocumentsCorrecteur extends Component {

    state = {
        open : false,
        revised : false,
        contenu: this.props.document.contenu,
    };

    onOpenModal = () => {
        this.setState({
            open : true
        });
    }

    onCloseModal = () => {
        this.setState({
            open : false,
            revised : true
        })
        // update texte corrigé
        Meteor.call('documents.update', this.props.document._id, this.state.contenu, this.props.utilisateur)
    }


    handleChange(event) {
        this.setState({ contenu: event.target.value })
    }

    render() {

        // console.log(this.props.document.length)

        const { open } = this.state;

        return (

            <ul className="details-documents">

                <li>
                    <p>créé à {this.props.document.creation.toLocaleTimeString()} par {this.props.document.auteur} <button onClick={this.onOpenModal}>Corriger</button> </p>

                    {this.state.revised ? <p>document corrigé</p> : undefined}

                    <Modal open={open} onClose={this.onCloseModal} >
                        <textarea name="correction" cols="30" rows="10" value={this.state.contenu} onChange={this.handleChange.bind(this)}>                        
                        </textarea>
                    </Modal>
                    

                </li>

            </ul>

        )

    }
}

