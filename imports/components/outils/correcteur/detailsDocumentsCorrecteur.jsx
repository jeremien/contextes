import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';

export default class detailsDocumentsCorrecteur extends Component {

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

        // update texte corrigé
    }

    render() {

        // console.log(this.props.document.length)

        const { open } = this.state;

        return (

            <ul className="details-documents">

                <li>
                    <p>créé à {this.props.document.creation.toLocaleTimeString()} par {this.props.document.auteur} <button onClick={this.onOpenModal}>Corriger</button> </p>

                    <Modal open={open} onClose={this.onCloseModal} >
                        <textarea name="correction" cols="30" rows="10">

                            {this.props.document.contenu}
                        
                        </textarea>
                    </Modal>
                    

                </li>

            </ul>

        )

    }
}


