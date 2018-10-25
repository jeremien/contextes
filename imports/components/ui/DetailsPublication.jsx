import React, { Component } from 'react';

import SortablePublication from './publication/SortablePublication';

class DetailsPublication extends Component {

    render() {

        // console.log(this.props)

        let { data, _id } = this.props;
        // console.log(data)

        return (
            
            <div>
                <h2>{this.props.titre}</h2>
                <SortablePublication data={data} id={_id} />
            </div>
                

        )

    }

}

export default DetailsPublication;