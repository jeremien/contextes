import React, { Component } from 'react';

class IndexLogs extends Component  {


    render() {

        if (this.props.logs != 0) {
            
            return (
                <div>logs</div>
            )

        } else {

            return <div>pas de logs</div>
        }

    }

}

export default IndexLogs;