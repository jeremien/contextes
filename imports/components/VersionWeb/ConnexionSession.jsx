import React from 'react'
import { Meteor } from 'meteor/meteor';

export default class ConnexionSession extends React.Coomponent {
    state = {
        essai = false,
        password: '',
    };

    handleSubmit() {
        this.setState({ essai: false })
        Meteor.call('connexions.session', this.props.match.params.sessionId, this.props.userId, this.state.password, function (result) {
            if (!result) {
                this.setState({ essai: true, password: '', })
            }
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input type='password' value={this.state.password} />
                    <button type="submit" value="envoyer" placeholder="envoyer" />
                </form>
            </div>
        )
    }
}