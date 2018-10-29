import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';

import { Form, Input, InputNumber, Slider, Button, message, Divider, Cascader } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const options = [
    {
        value : 'design',
        label : 'Design',
        children : [
            {
                value : 'graphisme',
                label : 'Graphisme'
            }
        ]
    },
    {
        value : 'art',
        label : 'Art',
        children : [
            {
                value : 'peinture',
                label : 'Peinture'
            }
        ]
    }
]


/**
 * Component gérant la création de session.
 */
class AjouterSession extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            titre: '',
            description: '',
            transcripteurs: 1,
            // correcteurs : 1,
            categories: [], 
            // categorieCourante: '' 
        }

        this.handleCategorieChange = this.handleCategorieChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitreChange = this.handleTitreChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTranscripteursChange = this.handleTranscripteursChange.bind(this);
        this.handleCorrecteursChange = this.handleCorrecteursChange.bind(this);
    }
    
    
    static propTypes = {
        utilisateur: PropTypes.string.isRequired,
    }

    handleCategorieChange(value) {
        this.setState({ categories : value })
    }

    handleTitreChange(event) {
        this.setState({titre : event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleTranscripteursChange(value) {
        this.setState({ transcripteurs: value });
    }

    handleCorrecteursChange(value) {
        this.setState({ correcteurs: value });
    }


    handleSubmit(event) {
        event.preventDefault();

        const auteur = this.props.utilisateur || inconnu;
        const roles = {
            transcripteurs: this.state.transcripteurs,
            // correcteurs: this.state.correcteurs
        }

        if (this.state.titre && this.state.description) {

            Meteor.call('sessions.insert', this.state.titre, auteur, this.state.description, roles, this.state.categories)
            
            this.setState({ 
                titre: '',
                description: '',
                transcripteurs: 10,
                // correcteurs : 1,
                // categorieCourante: "", 
                categories: [] 
            });
            
            let infos = {
                title : "message de l'éditeur",
                message : `création de la session : ${this.state.titre}`,
                type : "success"
            };

            Meteor.call('notification', infos);
        } else {

            message.error('Remplisser tous les champs!');
            
        }

      
    }

    render() {

        // console.log(this.state)

        if (this.props.connecte) {
            return (
                
                <Form 
                    onSubmit={this.handleSubmit}
                >
                    <FormItem
                        label='Nouvelle session'
                    >
                        <Input
                            placeholder='Titre de la session'
                            value={this.state.titre}
                            onChange={this.handleTitreChange}
                        />
                        <TextArea 
                            placeholder='Description de la session'
                            value={this.state.description}
                            autosize={{ minRows: 2, maxRows: 6 }}
                            onChange={this.handleDescriptionChange}
                        />
                    </FormItem>

                    <FormItem
                        label="Transcripteurs"
                    >   
                        <Slider 
                            size="small"
                            min={10}
                            max={30}
                            value={this.state.transcripteurs}
                            onChange={this.handleTranscripteursChange}
                        />

                        <InputNumber
                            size="small"
                            min={10}
                            max={30}
                            value={this.state.transcripteurs}
                            onChange={this.handleTranscripteursChange}
                        />

                    </FormItem>

                    {/* <FormItem
                        label="Correcteurs"
                    >   

                         <Slider 
                            size="small"
                            min={1}
                            max={10}
                            value={this.state.correcteurs}
                            onChange={this.handleCorrecteursChange}
                        />

                        <InputNumber
                            size="small"
                            min={1}
                            max={10}
                            value={this.state.correcteurs}
                            onChange={this.handleCorrecteursChange}
                            
                        />

                    </FormItem> */}

                    <Divider/>

                    <FormItem
                        label="Catégorie"
                    >   

                       <Cascader
                            options={options}
                            onChange={this.handleCategorieChange}
                            placeholder='choisir la catégorie'
                        /> 

                    
                    </FormItem>

                    <Divider/>

                    <FormItem >
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                        >
                            Créer la session
                        </Button>
                        <Button 
                            type="danger" 
                            onClick={() => this.setState({ 
                                titre: '',
                                description: '',
                                transcripteurs: 1,
                                correcteurs : 1
                            })}
                        >
                            Reset
                        </Button>
                    </FormItem>

                </Form>


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
