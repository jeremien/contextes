import React, { Component } from 'react';

import SortablePublication from './publication/SortablePublication';
import LayoutPublication from './publication/LayoutPublication';

class DetailsPublication extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modTitre : false
        }

        this.changeTitre = this.changeTitre.bind(this);
    }

    changeTitre = () => {
        this.setState({
            modTitre : !this.state.modTitre
        })
    }

    render() {

        // console.log(this.props)

        let { data, _id } = this.props;
        let { modTitre } = this.state;
        // console.log(data)

        return (
            
            <div>
                <h2 onClick={this.changeTitre}>
                   { modTitre ?
                    'input' :
                    'titre'
                   }
                </h2>
                <SortablePublication data={data} id={_id} />
                {/* <LayoutPublication /> */}
            </div>
                

        )

    }

}

export default DetailsPublication;