import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';

/**
 * Component gérant la création de session.
 */
class AjouterSession extends Component {
    constructor(props) {
        super(props);
        this.deleteCategorie = this.deleteCategorie.bind(this);
    }
    
    state = { description: '', categories: [], categorieCourante: "" }

    static propTypes = {
        utilisateur: PropTypes.string.isRequired,
    }

    handleChange(event) {
        this.setState({ description: event.target.value })
    }

    handleCategories(event) {
        if (event.target.value.slice(-1) == " ") {
            if (event.target.value.slice(0) == " ") {
                this.setState({ categorieCourante: "" });
            }
            else {
                var prevCategorie = this.state.categories;
                prevCategorie.push(this.state.categorieCourante);
                this.setState({ categories: prevCategorie, categorieCourante: "" });
            }
        }
        else {
            this.setState({ categorieCourante: event.target.value });
        }
    }

    deleteCategorie(categorie) {
        var prevCategorie = this.state.categories;
        prevCategorie.splice(prevCategorie.indexOf(categorie), 1);
        this.setState({ categories: prevCategorie });
    }

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target;
        const titre = target.titre.value;
        const auteur = this.props.utilisateur || inconnu;
        const roles = {
            transcripteurs: target.transcripteurs.value,
            correcteurs: target.correcteurs.value,
            conformateurs: target.conformateurs.value,
        };

        if (titre && this.state.description) {
            Meteor.call('sessions.insert', titre, auteur, this.state.description, roles, this.state.categories)
        target.reset()
        this.setState({ categorieCourante: "", categories: [] })
        }

        else {
            alert('Remplissez tous les champs')
        }
    }

    render() {
        if (this.props.connecte) {
            return (
                <div className="ajout-session">
                    <h2>Création d'une session</h2>
                    <br />
                    <form className="nouvelle-session" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            name="titre"
                            placeholder="Entrer le titre de la session"
                        />
                        <br />
                        <textarea
                            rows="4"
                            cols="50"
                            form="ajout-session"
                            placeholder="Une bref description de la session"
                            value={this.state.description}
                            onChange={this.handleChange.bind(this)}
                        >
                        </textarea>
                        <br />
                        <label>Nombre de transcripteurs</label>
                        <input
                            type="number"
                            defaultValue="1"
                            name="transcripteurs"
                            placeholder="1"
                            min="1"
                        />
                        <br />
                        <label>Nombre de correcteurs</label>
                        <input
                            type="number"
                            defaultValue="1"
                            name="correcteurs"
                            placeholder="1"
                            min="1"
                        />
                        <br />
                        <label>Nombre de conformateurs</label>
                        <input
                            type="number"
                            defaultValue="1"
                            name="conformateurs"
                            min="1"
                        />
                        <br />
                        <label>Choix des catégories possibles pour les chapitres</label>
                        <input
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
                        </ul>
                        <input type="submit" value="Enregistrer" />
                    </form>
                    <br />
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
