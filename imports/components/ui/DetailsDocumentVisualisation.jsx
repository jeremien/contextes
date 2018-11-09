import React from 'react';

const DetailsDocumentVisualisation = (props) => {

    // console.log(props)

    return (
        <div>
            
            {props.contenu}
            {props.image ? <img src={props.link} width='200px' /> : undefined}

        </div>
    )

}

export default DetailsDocumentVisualisation;