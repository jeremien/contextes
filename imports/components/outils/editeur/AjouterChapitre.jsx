import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Form, Input, InputNumber, Button, message, Slider } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const dureeBoucle = 10;


export default class AjouterChapitre extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            titre: '',
            description: '', 
            duree: dureeBoucle,
            tags: [], 
            tagCourant: "" 
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitreChange = this.handleTitreChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDureeChange = this.handleDureeChange.bind(this);

    }

    handleTitreChange(event) {
        this.setState({ titre: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleDureeChange(value) {
        this.setState( { duree : value });
    }

    // handleTags(event) {
    //     if (event.target.value.slice(-1) == " ") {
    //         var prevTag = this.state.tags;
    //         prevTag.push(this.state.tagCourant);
    //         this.setState({ tags: prevTag, tagCourant: "" });
    //     }
    //     else {
    //         this.setState({ tagCourant: event.target.value });
    //     }
    // }

    handleSubmit(event) {
        event.preventDefault();

        // const target = event.target;
        const auteur = Session.get('utilisateur');
        // const titre = target.titre.value;
        const session = this.props.sessionId;
        // const duree = target.duree.value || 1;

        if (this.state.titre && this.state.description) {
            Meteor.call(
                'chapitres.insert', 
                session, 
                this.state.titre, 
                auteur, 
                this.state.value, 
                this.state.duree, 
                this.state.tags)

            // target.reset();

            this.setState({ 
                titre: '',
                description: '', 
                duree: dureeBoucle,
                tags: [], 
                tagCourant: "" 
            });

            let infos = {
                title : "message de l'éditeur",
                message : "création d'un chapitre",
                type : "success"
            }

            Meteor.call('notification', infos);

        }
        
        else {

            message.error('Remplisser tous les champs!');
        
        }
    }

    render() {

        return (
            
            <Form
                onSubmit={this.handleSubmit}
            >

                <FormItem
                        label='Nouveau chapitre'
                    >
                        <Input
                            placeholder='Titre'
                            value={this.state.titre}
                            onChange={this.handleTitreChange}
                        />
                        <TextArea 
                            placeholder='Description'
                            value={this.state.description}
                            autosize={{ minRows: 2, maxRows: 6 }}
                            onChange={this.handleDescriptionChange}
                        />
                </FormItem>

                <FormItem
                        label="Durée des boucles"
                >   
                        <Slider 
                            size="small"
                            min={1}
                            max={60}
                            step={10}
                            value={this.state.duree}
                            onChange={this.handleDureeChange}
                        />

                        <InputNumber
                            size="small"
                            min={1}
                            max={60}
                            step={10}
                            value={this.state.duree}
                            onChange={this.handleDureeChange}
                        />

                </FormItem>

                <FormItem >

                        <Button 
                            type="primary" 
                            htmlType="submit" 
                        >
                            Créer le chapitre
                        </Button>

                        <Button 
                            type="danger" 
                            onClick={() => this.setState({ 
                                titre: '',
                                description: '', 
                                duree: dureeBoucle
                            })}
                        >
                            Reset
                        </Button>
                    </FormItem>



            </Form>
        
            // <div className="ajout-chapitre">
            //     <h3>Ajouter un chapitre</h3>
            //     <form className="nouveau-chapitre" onSubmit={this.handleSubmit.bind(this)} >
            //         <input
            //             type="text"
            //             name="titre"
            //             placeholder="Titre du chapitre"
            //         />
            //         <br />
            //         <textarea
            //             rows="4"
            //             cols="50"
            //             form="ajout-session"
            //             placeholder="Une bref description du chapitre"
            //             value={this.state.description}
            //             onChange={this.handleChange.bind(this)}
            //         >
            //         </textarea>
            //         <br />
            //         <label>Durée des boucles en minutes</label>
            //         <input
            //             type="number"
            //             name="duree"
            //             defaultValue="60"
            //             min="1"
            //         />
            //         <br />
            //         <label>Choix des tags possibles pour les documents</label>
            //         <input
            //             type="text"
            //             name="tag"
            //             value={this.state.tagCourant}
            //             onChange={this.handleTags.bind(this)}
            //         />
            //         <ul>Tags actuels
            //                  {Object.entries(this.state.tags).map(([key, tag]) => (
            //                 <li key={key}>{tag}</li>
            //             ))}
            //         </ul>
            //         <input type="submit" value="Enregistrer" />
            //     </form>
            // </div>
        )
    }
}