import React, { Component } from 'react';

export default class Reset extends Component {

    reset(type) {
        console.log('reset')
        Meteor.call('reset', type);
    }


    render() {


        return (
            <div className='reset'>
                <p>reset database</p>
                <button onClick={() => this.reset('message')}>messages</button>
            </div>
        )
    }


}