import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReactNotification from "react-notifications-component";

import { List, Button, Modal, Form, Input, Icon, Card, Carousel } from 'antd'

class TestAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: initialValue
        }
          this.handleValueChange = this.handleValueChange.bind(this)
    }


    handleValueChange(value) {
        // this.setState({value: value});
        console.log(value)
      };

      onChange = ({ value }) => {
        this.setState({ value })
      }
    render() {

        return (
            <div style={{ margin: "20px" }}>
        {/* <CannerEditor value={this.state.value} onChange={this.onChange} /> */}
      </div>
        )

    }
}

export default TestAPI;
