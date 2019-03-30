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

        // console.log(this.state.rejete)

        return (

            <button className={ this.state.rejete ? "btt bcg bg cfgr py txta" : "btt bcr bg fcr py txta"} onClick={(e) => {
                this.setState({ rejete : !this.state.rejete });
                Meteor.call('documents.rejet', this.props.id, this.state.rejete)
            }}>{ this.state.rejete ? 'accepter' : 'rejeter' }</button>

        )
    }
}