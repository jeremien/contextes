import React from 'react';

import { Alert } from 'antd';

class AlertMessage extends React.Component {

    render() {

        return (

            <Alert 
                message='Commencer la transcription'
                type='success'
            />

        )

    }

}

export default AlertMessage;