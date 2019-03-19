import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { getImageLink } from '../utils/Images';

import Moment from 'react-moment';

const ListeDocuments = (props) => {

    return props.documents.map((item) => {

        let link = getImageLink(item);

            return (
                <div key={item._id} className='wmax'>  
                    <p className='cff'><Moment format='HH:mm:ss'>{item.creation}</Moment></p>
                    { link ? <img src={link} /> : undefined } 
                    <ReactMarkdown
                        source={item.contenu}
                        escapeHtml={false}
                    />
                </div>
            )
        
        
    });

}

export default ListeDocuments;