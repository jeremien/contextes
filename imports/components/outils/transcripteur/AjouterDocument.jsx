import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';

import { Form, Input, Button, message } from 'antd';

const { TextArea } = Input;

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
    
            Meteor.call('log.insert', 'document', `${auteur} a écrit ${this.state.commentaire}` );

        } else {

            message.error('Écrivez un texte!');

        }
       
    }

    handleChange(event) {
        this.setState({ commentaire: event.target.value })
    }

    render() {

        // console.log(this.state)

        return (

            <Form
                onSubmit={this.handleSubmit}
            >
                
                <TextArea
                    placeholder='texte'
                    value={this.state.commentaire}
                    autosize={{ minRows: 10, maxRows: 200 }}
                    onChange={this.handleChange}
                    // onPressEnter={this.handleSubmit}
                    style={{ fontSize: '1.5rem'}}
                >
                    <div style={{ margin: '24px 0', fontSize: '50px'}} />
                </TextArea>
                <Button.Group style={{ margin: '24px 0'}}>

                    <Button 
                        type="primary" 
                        htmlType="submit" 
                    >
                        Enregistrer
                    </Button>

                    <Button 
                        type="danger" 
                        onClick={() => this.setState({ 
                            commentaire: ''
                        })}
                    >
                        Reset
                    </Button>

                </Button.Group>
              

            </Form>
        )
    }
}