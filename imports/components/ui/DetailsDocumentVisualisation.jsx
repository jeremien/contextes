import React from 'react';
import ReactMarkdown from 'react-markdown';

const DetailsDocumentVisualisation = (props) => {


    return <div>
                <ReactMarkdown
                    source={props.contenu}
                />
            </div>

}

export default DetailsDocumentVisualisation;