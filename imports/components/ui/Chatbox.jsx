import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/collections/messages';

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

    handleSubmit(e) {
        e.preventDefault();
        if (!!this.state.message) {
            Meteor.call('messages.insert', this.props.utilisateur, this.state.message);
            
            let notification = { titre : this.props.utilisateur, message : this.state.message }
            Meteor.call('notification', notification);
            
            this.setState({ message: "" });
        }
    }

    handleTyping(e) {
        this.setState({ message: e.target.value });
    }

    chatList = (datas) => {
        if (datas.length > 10) {
            let last = datas.pop();
            Meteor.call('messages.remove', last._id);
        }

        return datas.map((data, index) => {
            return <li key={index}> <span className='cff'>{data.auteur}</span> {data.message}</li>
        })
    }

    render() {

        return (
            <form className="chatbox" onSubmit={this.handleSubmit}>

               
  
                {this.props.messagesExists &&
                    <ul className='chatbox--message'>
                        { this.chatList(this.props.messages) }
                    </ul>
                
                }

                <input 
                    className='btt mt reset'
                    type='text'
                    value={this.state.message}
                    onChange={this.handleTyping}
                    placeholder='message'
                />

                </form>

        )
    }
}

export default withTracker((props) => {
    const messagesHandle = Meteor.subscribe('messages');
    const loading = !messagesHandle.ready();
    const messages = Messages.find({}, { sort : { creation : -1} })
    const messagesExists = !loading && !!messages;
    return {
        loading,
        messagesExists,
        messages: messagesExists ? messages.fetch() : [{}],
    }
})(Chatbox);
