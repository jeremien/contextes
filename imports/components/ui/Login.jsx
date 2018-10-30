import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Connexions } from '../../api/collections/connexions'

import { Form, Input, Button, Select, Icon, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            role: Session.get('role') || 'transcripteur' 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!!this.state.username){
            Meteor.call('connexions.insert', this.state.username, this.state.role, this.props.socketId, function (error, id) {
            localStorage.setItem('userId', id)
            Session.set('userId', id)
        });

        let infos = {
            title : "message général",
            message : `connexion de ${this.state.username} comme ${this.state.role}`,
            type : "info"
        };

        Meteor.call('notification', infos);
        Meteor.call('log.insert', 'notification', infos.message );

        if (this.props.history) {
            this.props.history.push('/sessions');
        }
    }
        else {
            message.error("indiquer un nom d'utilisateur")
        }
    }

    handleRoleChange(value) {
        this.setState({ role: value });
    }

    handleUsername(e) {
        this.setState({ username: e.target.value })
    }

    render() {

        const { username } = this.state;

        return (
            
            <Form 
                layout='inline'
                onSubmit={this.handleSubmit}
            >
                
                <FormItem>
                    
                    <Input 
                        placeholder='votre nom' 
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={username}
                        onChange={this.handleUsername}
                    />
                
                </FormItem>

                <FormItem>

                    <Select
                        defaultValue={this.state.role}
                        style={{ width: 200 }}
                        onChange={this.handleRoleChange}
                    >   
                        {!this.props.loading && (this.props.connexions.length == 0) &&
                            <Option value='editeur'>Éditeur</Option>
                        }
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

            </Form>


        );
    }
}

export default withTracker((props) => {
    const connexionsHandle = Meteor.subscribe('connexions');
    const loading = !connexionsHandle.ready();
    const connexions = Connexions.find({ role: 'editeur' })
    const connexionsExists = !loading && !!connexions;
    return {
        loading,
        connexionsExists,
        connexions: connexionsExists ? connexions.fetch() : [{}],
    }
})(Login);