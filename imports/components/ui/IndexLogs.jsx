import React, { Component } from 'react';

class IndexLogs extends Component  {


    render() {

        // console.log(this.props.logs)

        if (this.props.logs != 0) {
            
            return this.props.logs.map((item) => {
                return (<div key={item._id}>
                    
                            {item.creation.toLocaleTimeString()} {item.type} {item.contenu}
                    
                    
                        </div>)
            })

        } else {

            return <div>pas de logs</div>
        }

    }

}

export default IndexLogs;