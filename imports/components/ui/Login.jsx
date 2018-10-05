import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Connexions } from '../../api/collections/connexions'

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { role: Session.get('role') || 'transcripteur' };
    }

    handleSubmit(event) {
        event.preventDefault();
        const target = event.target
        const nom = target.nom.value;

        Meteor.call('connexions.insert', nom, this.state.role, this.props.socketId, function (error, id) {
            localStorage.setItem('userId', id)
            Session.set('userId', id)
        });

        this.props.history.push('/');
    }

    handleChange(event) {
        this.setState({ role: event.target.value });
    }

    render() {
        return (
            // <form className="login" onSubmit={this.handleSubmit.bind(this)}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Input type="text" name="nom" placeholder="nom"  />
                {/* <input type="text" name="nom" placeholder="nom" /> */}

                <Select value={this.state.role} onChange={this.handleChange.bind(this)}>
                    {!this.props.loading && (this.props.connexions.length == 0) &&
                        // <option value="editeur">Éditeur</option>
                        <Option value="editeur" label="Éditeur"/>
                    }
                    <Option value="transcripteur" label="Transcripteur" />
                    <Option value="correcteur" label="Correcteur" />
                    <Option value="conformateur" label="Conformateur" />

                </Select>

                {/* <select value={this.state.role} onChange={this.handleChange.bind(this)}>
                    {!this.props.loading && (this.props.connexions.length == 0) &&
                        <option value="editeur">Éditeur</option>
                    }
                    <option value="transcripteur">Transcripteur</option>
                    <option value="correcteur">Correcteur</option>
                    <option value="conformateur">Conformateur</option>

                </select> */}


                <input type="submit" value="connexion" />
            {/* </form> */}
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