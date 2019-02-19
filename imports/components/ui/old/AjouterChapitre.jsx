import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import {  Form, Input, InputNumber, Button, message, Slider, Tag, Divider, Tooltip, Icon } from 'antd';

const FormItem = Form.Item;
const {  TextArea } = Input;


export default class AjouterChapitre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            description: '',
            inputVisible: false,
            inputValue: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitreChange = this.handleTitreChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);



    }

    handleTitreChange(event) {
        this.setState({ titre: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }



    handleSubmit(event) {
        event.preventDefault();
        const auteur = Session.get('utilisateur');
        const session = this.props.sessionId;

        if (this.state.titre && this.state.description) {
            Meteor.call(
                'chapitres.insert',
                session,
                this.state.titre,
                auteur,
                )

            let infos = {
                title: `message de l'éditeur`,
                message: `création d'un chapitre : ${this.state.titre}`,
                type: "success"
            }

            Meteor.call('notification', infos);

            this.setState({
                titre: '',
                description: ''
            });

        } else {

            message.error('Remplisser tous les champs!');

        }
    }

  

    render() {

        return (

            <Form onSubmit = { this.handleSubmit } >

            <FormItem label = 'Nouveau chapitre' >
                <Input placeholder = 'Titre'
                    value = { this.state.titre }
                    onChange = { this.handleTitreChange }
                /> 
                <TextArea placeholder = 'Description'
                    value = { this.state.description }
                    autosize = {
                    { minRows: 2, maxRows: 6 } }
                    onChange = { this.handleDescriptionChange }
                /> 
            </FormItem>

            <FormItem >
                <Button type = "primary"
                    htmlType = "submit" >
                    Créer le chapitre 
                </Button>
                <Button type = "danger"
                    onClick = {
                        () => this.setState({
                            titre: '',
                            description: '',
                        })
                } >
                    Reset 
                </Button> 
            </FormItem>

            </Form>

          
        )
    }
}