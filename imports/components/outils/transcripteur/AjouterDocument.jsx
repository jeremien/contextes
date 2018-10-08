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
        // const target = event.target;
        // const commentaire = target.contentInput.value;
        // const auteur = Session.get('utilisateur');
        const auteur = this.props.utilisateur;
        const session = this.props.chapitre.session;
        const chapitre = this.props.chapitre._id;

        // console.log(commentaire, auteur, session, chapitre)

        if (this.state.commentaire) {

            Meteor.call('documents.insert', session, chapitre, this.state.commentaire, auteur)
            // event.target.reset();
    
            this.setState({
                commentaire: ''
            });
    
            let infos = {
                title : "message du transcripteur",
                message : `ajout du document`,
                type : "info"
            }
    
            Meteor.call('notification', infos);

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
                    onPressEnter={this.handleSubmit}
                    style={{ fontSize: '1.5rem'}}
                >
                    <div style={{ margin: '24px 0', fontSize: '50px'}} />
                </TextArea>
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

            </Form>


            // <div className="ajout-commentaire">
            //     <form className="nouveau-commentaire" onSubmit={this.handleSubmit.bind(this)} >
            //         <textarea
            //             rows="4"
            //             cols="50"
            //             name="contentInput"
            //             placeholder="Entrer le nouveau commentaire"
            //             value={this.state.commentaire}
            //             onChange={this.handleChange.bind(this)}
            //         />
            //         <br />
                    
            //         <input className="valider-document" type="submit" value="Enregistrer" />
            //     </form>
            //     <button className="clear-commentaire" onClick={() => this.setState({ commentaire: "" })}>Clear</button>
            // </div>
        )
    }
}