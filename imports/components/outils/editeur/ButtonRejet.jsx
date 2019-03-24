import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ButtonRejet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rejete : null
        }
    }

    componentWillMount() {
        this.setState({
            rejete : this.props.rejete
        })
    }

    render() {
        return (

            <button className="btt bcg bg cfgr py txta" onClick={(e) => {
                this.setState({ rejete : !this.state.rejete });
                Meteor.call('documents.rejet', this.props.id, this.state.rejete)
            }}>{ this.state.rejete ? 'accepter' : 'rejeter' }</button>

        )
    }
}