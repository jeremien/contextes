import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Connexions } from '../../api/collections/connexions'
import { Accounts } from 'meteor/accounts-base'

import { Form, Input, Button, Select, Icon, message, Switch } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: "",
            email: '',
            role: Session.get('role') || null,
            inscription: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRoleChange = this.handleRoleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        const self = this;
        //Controle du remplissage des champs
        if (!!this.state.username && !!this.state.role) {
            //Chontrole choix entre inscription et connexion
            if (this.state.inscription) {
                const { username, role, socketId } = { username: this.state.username, role: this.state.role, scoketId: this.props.socketId }
                Meteor.call('connexions.insert.web', username, this.state.password, this.state.email, role, socketId, function (error, idMeteor) {
                    if (error) {
                        alert(error)
                    }
                    else {
                        self.setState({inscription: false})
                        alert('Compte créé, vous pouvez maintenant vous connectez')
                        Meteor.call('connexions.insert.local', idMeteor, username, role, socketId)
                    }
                })
            }

            else {
                Meteor.loginWithPassword(this.state.username, this.state.password, function (error) {
                    console.log("erreur connexion :", error)
                })
                let infos = {
                    title: "message général",
                    message: `connexion de ${this.state.username} comme ${this.state.role}`,
                    type: "info"
                };

                Meteor.call('notification', infos);
                Meteor.call('log.insert', 'notification', infos.message);

                if (this.props.history) {
                    this.props.history.push('/sessions');
                }
            }
        }
        else {
            message.error("indiquer un nom d'utilisateur et/ou un role")
        }
    }

    handleRoleChange(value) {
        this.setState({ role: value });
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {

        const { username, password, email } = this.state;
        return (
            <div>
                <Switch
                    defaultChecked={this.state.toggleInscription}
                    checked={this.state.inscription}
                    onChange={() => this.setState({ inscription: !this.state.inscription })}
                    style={{ marginBottom: '20px' }}
                />
                {this.state.inscription ?
                <h3>Inscription</h3>
                :
                <h3>Connexion</h3>
                }

                <Form
                    layout='inline'
                    onSubmit={this.handleSubmit}
                >

                    <FormItem>

                        <Input
                            placeholder='votre nom'
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={username}
                            onChange={this.handleInputChange}
                            name='username'
                        />

                    </FormItem>

                    <FormItem>

                        <Input
                            placeholder='votre mot de passe'
                            prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={password}
                            onChange={this.handleInputChange}
                            name='password'
                        />

                    </FormItem>

                    {this.state.inscription &&
                        <FormItem>

                            <Input
                                placeholder='votre adresse mail'
                                prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                value={email}
                                onChange={this.handleInputChange}
                                name='email'
                            />

                        </FormItem>
                    }

                    <FormItem>

                        <Select
                            defaultValue={this.state.role}
                            style={{ width: 200 }}
                            onChange={this.handleRoleChange}
                        >
                            {!this.props.loading && (this.props.editeur.length == 0) &&
                                <Option value='editeur'>Éditeur</Option>
                            }

                            {/* {!this.props.loading && (this.props.transcripteurs.length < this.props.role.transcripteurs) &&
                            < Option value='transcripteur'>Transcripteur</Option>
                        } */}
                            <Option value='transcripteur'>Transcripteur</Option>
                            <Option value='correcteur'>Correcteur</Option>
                            <Option value='iconographe'>Iconographe</Option>
                            {/* <Option value='conformateur'>Conformateur</Option> */}

                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            Envoyer
                    </Button>
                    </FormItem>

                </Form >
            </div>

        );
    }
}

export default withTracker((props) => {
    const connexionsHandle = Meteor.subscribe('connexions');
    const loading = !connexionsHandle.ready();
    const editeur = Connexions.find({ role: 'editeur' })
    const transcripteurs = Connexions.find({ role: 'transcripteur' })
    const editeurExists = !loading && !!editeur;
    const transcripteursExists = !loading && !!transcripteurs
    return {
        loading,
        editeurExists,
        transcripteursExists,
        editeur: editeurExists ? editeur.fetch() : [{}],
        transcripteurs: transcripteursExists ? transcripteurs.fetch() : [{}]
    }
})(Login);