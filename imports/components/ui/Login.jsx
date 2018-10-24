import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Connexions } from '../../api/collections/connexions'

import { Form, Input, Button, Select, Icon } from 'antd';

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

        // console.log(event)



        // const target = event.target
        // const nom = target.nom.value;

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

        this.props.history.push('/sessions');
    }

    handleRoleChange(value) {
        // console.log('change', value )
        this.setState({ role: value });
    }

    handleUsername(e) {
        // console.log(e.target.value)
        this.setState({ username: e.target.value })
    }

    render() {

        // console.log(this.state)
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
                        // placeholder='Sélectionner votre rôle' 
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

            
            // <Field onSubmit={this.handleSubmit.bind(this)}>
            //     <Label htmlFor="nom">votre nom</Label>
            //     <Input name="nom" placeholder="taper votre nom" />

            //     <Label htmlFor="role">votre rôle</Label>
            //     <Input as="select" onChange={this.handleChange.bind(this)}>
            //         <option>Éditeur</option>
            //         <option>Transcripteur</option>
            //         <option>Correcteur</option>
            //         <option>Conformateur</option>                   
            //     </Input>
            //     <Button onClick={() => console.log('click')}>Login</Button>
            // </Field>

        //     <Form>
        //         <FormItem>
        //             {/* <Input placeholder="Your name"/> */}
        //             {/* <Input type="text" name="nom" placeholder="nom"  /> */}
        //             {/* <Input /> */}
        //         </FormItem>
        //         <FormItem>
        //             <Button text="Submit"/> 
        //         </FormItem>
        //   </Form>
            

            // <form className="login" onSubmit={this.handleSubmit.bind(this)}>
            // <Form onSubmit={this.handleSubmit.bind(this)}>
            //     <Input type="text" name="nom" placeholder="nom"  />
            //     {/* <input type="text" name="nom" placeholder="nom" /> */}

            //     <Select value={this.state.role} onChange={this.handleChange.bind(this)}>
            //         {!this.props.loading && (this.props.connexions.length == 0) &&
            //             // <option value="editeur">Éditeur</option>
            //             <Option value="editeur" label="Éditeur"/>
            //         }
            //         <Option value="transcripteur" label="Transcripteur" />
            //         <Option value="correcteur" label="Correcteur" />
            //         <Option value="conformateur" label="Conformateur" />

            //     </Select>

                /* <select value={this.state.role} onChange={this.handleChange.bind(this)}>
                    {!this.props.loading && (this.props.connexions.length == 0) &&
                        <option value="editeur">Éditeur</option>
                    }
                    <option value="transcripteur">Transcripteur</option>
                    <option value="correcteur">Correcteur</option>
                    <option value="conformateur">Conformateur</option>

                </select> */


                // <input type="submit" value="connexion" />
            /* </form> */
            // </Form>

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