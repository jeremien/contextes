import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/collections/messages';
import { List, message, Avatar, Spin, Input, Divider } from 'antd';
import styled from 'styled-components';

const ChatList = styled.ul`
    list-style : none;
`

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
        Meteor.call('messages.insert', this.props.utilisateur, this.state.message)
        Meteor.call('log.insert', 'message', `${this.props.utilisateur} a écrit : ${this.state.message}` );
        this.setState({message: ""})
        
    }

    handleTyping(e){
        this.setState({message: e.target.value})
    }

    chatList = (datas) => {
        return datas.map((data, index) => {
            // console.log(data)
            return <li key={index}>{data.message} de {data.auteur}</li>
        })
    }

    render() {
        return (
            <div className="chatbox">
                {this.props.messagesExists &&
                    // <List
                    //     header={<div>Header</div>}
                    //     footer={<div>Footer</div>}
                    //     bordered
                    //     dataSource={this.props.messages}
                    //     renderItem={item => (<List.Item>{item.message}, <i>de {item.auteur}</i></List.Item>)}
                    // />
                    <ChatList>
                        {this.chatList(this.props.messages)}
                    </ChatList>    

                }
                    <Input value={this.state.message} onChange={this.handleTyping} onPressEnter={this.handleSubmit} />
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
