import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';

import { Form, Input, Select, Option, Textarea, Button, Checkbox } from 'muicss/react'

/**
 * Component gérant la création de session.
 */
class AjouterSession extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            description: '', 
            categories: [], 
            categorieCourante: "",
            showForm: false 
        }

        // this.deleteCategorie = this.deleteCategorie.bind(this);
    }
    
    

    static propTypes = {
        utilisateur: PropTypes.string.isRequired,
    }

    handleChange(event) {
        this.setState({ description: event.target.value })
    }

    // handleCategories(event) {
    //     if (event.target.value.slice(-1) == " ") {
    //         if (event.target.value.slice(0) == " ") {
    //             this.setState({ categorieCourante: "" });
    //         }
    //         else {
    //             var prevCategorie = this.state.categories;
    //             prevCategorie.push(this.state.categorieCourante);
    //             this.setState({ categories: prevCategorie, categorieCourante: "" });
    //         }
    //     }
    //     else {
    //         this.setState({ categorieCourante: event.target.value });
    //     }
    // }

    // deleteCategorie(categorie) {
    //     var prevCategorie = this.state.categories;
    //     prevCategorie.splice(prevCategorie.indexOf(categorie), 1);
    //     this.setState({ categories: prevCategorie });
    // }

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const titre = target.titre.value;
        const auteur = this.props.utilisateur || inconnu;
        const roles = {
            transcripteurs: target.transcripteurs.value,
            correcteurs: target.correcteurs.value,
            // conformateurs: target.conformateurs.value,
        };

        if (titre && this.state.description) {
            Meteor.call('sessions.insert', titre, auteur, this.state.description, roles, this.state.categories)
            target.reset()
            this.setState({ categorieCourante: "", categories: [] })

            // envoie des notifications

            let infos = {
                title : "message de l'éditeur",
                message : `création de la session : ${titre}`,
                type : "success"
            }

            Meteor.call('notification', infos);
        }

        else {
            alert('Remplissez tous les champs')
        }
    }

    render() {

        // console.log(this.state)

        if (this.props.connecte) {
            return (
                <div className="ajout--session">
                     <div className="mui--text-title" onClick={() => this.setState({showForm : !this.state.showForm})}>Création d'une session  </div>

                    {this.state.showForm && 
                    <Form className="nouvelle-session" onSubmit={this.handleSubmit.bind(this)} >
                        <Input
                            type="text"
                            name="titre"
                            placeholder="Entrer le titre de la session"
                            required
                        />
                        <Textarea
                            rows="1"
                            cols="50"
                            form="ajout-session"
                            placeholder="Une bref description de la session"
                            value={this.state.description}
                            onChange={this.handleChange.bind(this)}
                        />
                        <legend>Nombre de transcripteurs</legend>
                        <Input
                            type="number"
                            defaultValue="1"
                            name="transcripteurs"
                            placeholder="1"
                            min="1"
                            required
                        />
                        <legend>Nombre de correcteurs</legend>
                        <Input
                            type="number"
                            defaultValue="1"
                            name="correcteurs"
                            placeholder="1"
                            min="1"
                        />
                        {/* <label>Nombre de conformateurs</label>
                        <Input
                            type="number"
                            defaultValue="1"
                            name="conformateurs"
                            min="1"
                        /> */}
                        {/* <label>Choix des catégories possibles pour les chapitres</label>
                        <Input
                            type="text"
                            name="categorie"
                            value={this.state.categorieCourante}
                            onChange={this.handleCategories.bind(this)}
                        />
                        <ul>Catégories actuelles
                             {this.state.categories.map((categorie) => (
                                <li key={categorie}>
                                    {categorie}
                                </li>
                            ))}
                        </ul> */}
                        {/* <input type="submit" value="Enregistrer" /> */}
                        <Button color="primary" value="Enregistrer">Enregistrer</Button>
                    </Form>
                    } 
                    
                </div>
            )
        }
        else {
            return (
                <h1>Vous devez être connecté.e</h1>
            )
        }
    }
}

export default AjouterSession;
