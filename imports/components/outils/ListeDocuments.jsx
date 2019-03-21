import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import Moment from 'react-moment';

import ModifierImage from './iconographe/ModifierImage';

import { getImageLink } from '../utils/Images';


const ListeDocuments = (props) => {

    return props.documents.map((item) => {


        if (item.rejete) {

            let link = getImageLink(item);

            return (
                <div key={item._id} className='wmax'>  
                    
                    <p className='cff'><Moment format='HH:mm:ss'>{item.creation}</Moment></p>
                    
                    { link ? <img src={link} /> : undefined } 
                    
                    <ReactMarkdown
                        source={item.contenu}
                        escapeHtml={false}
                    />
                    
                    { props.role === 'iconographe' ? <ModifierImage {...props} documentId={item._id} /> : undefined }

                </div>
            )

        }
        
        
    });

}

export default ListeDocuments;