import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import {  Form, Input, InputNumber, Button, message, Slider, Tag, Divider, Tooltip, Icon } from 'antd';

const FormItem = Form.Item;
const {  TextArea } = Input;
const dureeBoucle = 20;


export default class AjouterChapitre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            description: '',
            duree: dureeBoucle,
            tags: [],
            inputVisible: false,
            inputValue: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitreChange = this.handleTitreChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDureeChange = this.handleDureeChange.bind(this);

        //tags
        this.handleCloseTag = this.handleCloseTag.bind(this);
        this.showInputTag = this.showInputTag.bind(this);
        this.handleInputChangeTag = this.handleInputChangeTag.bind(this);
        this.handleInputConfirmTag = this.handleInputConfirmTag.bind(this);

    }

    handleTitreChange(event) {
        this.setState({ titre: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleDureeChange(value) {
        this.setState( { duree: value });
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
                this.state.value,
                this.state.duree,
                this.state.tags)

            let infos = {
                title: `message de l'éditeur`,
                message: `création d'un chapitre : ${this.state.titre}`,
                type: "success"
            }

            Meteor.call('notification', infos);
            Meteor.call('log.insert', 'notification', infos.message );

            this.setState({
                titre: '',
                description: '',
                duree: dureeBoucle,
                tags: [],
                tagCourant: ""
            });

        } else {

            message.error('Remplisser tous les champs!');

        }
    }

    // tags

    handleCloseTag(removedTag) {
        const tags = this.state.tags.filter((tag) => {
                return tag !== removedTag
            })
        this.setState({ tags });
    }

    showInputTag() {
        this.setState({
                inputVisible: true
            },
            () => this.input.focus())
    }

    handleInputChangeTag(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleInputConfirmTag() {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;

        if (inputValue && tags.indexOf(inputValue) == -1) {
            tags = [...tags, inputValue];
        }

        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        });
    }

    saveInputRef = input => this.input = input

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

            <FormItem label = 'Tags' >

            {
                this.state.tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = ( 
                        <Tag key = { tag }
                        closable = { index !== 0 }
                        afterClose = {
                            () => this.handleCloseTag(tag) } >

                        { isLongTag ? `${tag.slice(0,20)}...` : tag }

                        </Tag>
                    )

                    return isLongTag ? < Tooltip title = { tag }
                    key = { tag } > { tagElem } </Tooltip> : tagElem;
                })
            }

            {
                this.state.inputVisible && (

                    <Input ref = { this.saveInputRef }
                        type = 'text'
                        size = 'small'
                        style = {
                            { width: 78 } }
                        value = { this.state.inputValue }
                        onChange = { this.handleInputChangeTag }
                        onBlur = { this.handleInputConfirmTag }
                        onPressEnter = { this.handleInputConfirmTag }
                    />

                )
            }

            {
                !this.state.inputVisible && ( <Tag onClick = { this.showInputTag }
                    style = {
                        { background: '#fff', borderStyle: 'dashed' } } >
                    <Icon type = 'plus' /> New Tag </Tag>
                )
            }



            </FormItem>

            <Divider />

            <FormItem label = "Durée des boucles en seconde" >
                <Slider size = "small"
                    min = { 5 }
                    max = { 900 }
                    value = { this.state.duree }
                    onChange = { this.handleDureeChange }
                />

                <InputNumber size = "small"
                    min = { 5 }
                    max = { 900 }
                    step = { 5 }
                    value = { this.state.duree }
                    onChange = { this.handleDureeChange }
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
                            duree: dureeBoucle
                        })
                } >
                    Reset 
                </Button> 
            </FormItem>

            </Form>

          
        )
    }
}