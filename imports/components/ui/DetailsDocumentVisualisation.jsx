import React from 'react';
import ReactMarkdown from 'react-markdown';

const DetailsDocumentVisualisation = (props) => {

    // console.log(props.contenu)
    // {props.image ? <img src={props.link} width='200px' /> : undefined}

    return <div>
                {props.image ? <img src={props.link} width='200px' /> : undefined}
                <ReactMarkdown
                    source={props.contenu}
                />
            </div>

}

export default DetailsDocumentVisualisation;