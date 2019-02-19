import React from 'react'
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import DetailsChapitreContainer from '../../data/DetailsChapitreContainer';
import DetailsSession from '../DetailsSession';
import { Form, Input, Button, Select, Icon, message, Switch } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import { withTracker } from 'meteor/react-meteor-data';

class ConnexionSession extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            essai: false,
            password: '',
            isInSession: false
        };
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     this.setState({isInSession: Roles.userIsInRole('admis', this.props.match.params.sessionId)})
    // }

    handleSubmit() {
        // this.setState({ essai: false })
        console.log('submit')
        Meteor.call('sessions.connexion', Meteor.userId(), this.props.match.params.sessionId, this.state.password, function (error, result) {
           alert('error', error)
            alert('result', result)
            if (!result) {
                // this.setState({ essai: true, password: '', })
            }
        })
    }

    handlePassword(e) {
        e.preventDefault()
        this.setState({ password: e.target.value })
    }

    render() {
        if (this.props.autorise) {
            return (
                <DetailsSession {...this.props} />
            )
        }
        else {
            return (
                <Form
                    layout='inline'
                    onSubmit={this.handleSubmit}
                >

                    <FormItem>

                        <Input
                            placeholder='password'
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={this.state.password}
                            onChange={this.handlePassword}
                            name='password'
                        />

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
            )
        }

    }
}

export default withTracker((props) => {
    const autorise = !!(Roles.userIsInRole(Meteor.user(), 'admis', props.match.params.sessionId))
    // const autorise = false
    return { autorise: autorise }
})(ConnexionSession)