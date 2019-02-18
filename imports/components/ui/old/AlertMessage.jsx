import React from 'react';

import { Alert } from 'antd';

class AlertMessage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onAir : this.props.onAir
        }
    }

    render() {
        return (


            <Alert 
                message= {this.props.onAir ? 'commencer la transcription' : 'arrêter la transcription'}
                type={this.props.onAir ? 'success' : 'error'}
            />

        )

    }

}

export default AlertMessage;