import React, { Component } from 'react';

import DocumentChange from './DocumentChange';

class DetailsDocumentEdition extends Component {


    render() {
        // console.log(this.props)

        return <DocumentChange {...this.props} item={this.props}/>

    }

}

export default DetailsDocumentEdition;