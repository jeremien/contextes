import React from 'react';
import ReactMarkdown from 'react-markdown';

const DetailsDocumentVisualisation = (props) => {


    return <div className='visualisation'>
                <ReactMarkdown
                    source={props.contenu}
                />
            </div>

}

export default DetailsDocumentVisualisation;