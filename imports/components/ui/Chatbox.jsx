import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/collections/messages';
import { List, message, Avatar, Spin, Input, Divider } from 'antd';



class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initLoading: true,
            loading: false,
            data: [],
            list: [],
            message: "",
        }
        this.handleTyping = this.handleTyping.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        if (!!this.state.message) {
            Meteor.call('messages.insert', this.props.utilisateur, this.state.message)
            Meteor.call('log.insert', 'message', `${this.props.utilisateur} a écrit : ${this.state.message}`);
            this.setState({ message: "" })
        }
    }

    handleTyping(e) {
        this.setState({ message: e.target.value })
    }

    chatList = (datas) => {
        return datas.map((data, index) => {
            return <li key={index}> {data.auteur} a écrit : {data.message}</li>
        })
    }

    render() {
        return (
            <div className="chatbox">
                <h3>Messages</h3>
                {this.props.messagesExists &&
        
                        this.chatList(this.props.messages)

                }
                <Input value={this.state.message} onChange={this.handleTyping} onPressEnter={this.handleSubmit} placeholder='écrivez votre message' />
            </div>

        )
    }
}

export default withTracker((props) => {
    const messagesHandle = Meteor.subscribe('messages');
    const loading = !messagesHandle.ready();
    const messages = Messages.find({})
    const messagesExists = !loading && !!messages;
    return {
        loading,
        messagesExists,
        messages: messagesExists ? messages.fetch() : [{}],
    }
})(Chatbox);
