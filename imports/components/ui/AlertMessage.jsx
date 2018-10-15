import React from 'react';

import { Alert } from 'antd';

class AlertMessage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onAir : true
        }
    }

    render() {

        // console.log(this.props.socket)
        this.props.socket.on('onAir', () => this.setState({ onAir : true}));
        this.props.socket.on('offAir', () => this.setState({ onAir : false}));

        // console.log(this.state)

        return (


            <Alert 
                message= {this.state.onAir ? 'commencer la transcription' : 'arrêter la transcription'}
                type={this.state.onAir ? 'success' : 'error'}
            />

        )

    }

}

export default AlertMessage;