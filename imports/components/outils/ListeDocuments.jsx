import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import Moment from 'react-moment';

import ModifierImage from './iconographe/ModifierImage';

import { getImageLink } from '../utils/Images';


const ListeDocuments = (props) => {

    if (props.chapitre.isOpen) {

        return props.documents.map((item) => {
    
            if (!item.rejete) {
    
                let link = getImageLink(item);
    
                return (
                    <div key={item._id} className='wmax'>  
                        
                        <p className='cff'><Moment format='HH:mm:ss'>{item.creation}</Moment></p>
                        
                        { link ? <img src={link} /> : undefined } 
    
                        { 
                            item.type === 'screenshot' ? <img src={item.data} /> : undefined
                        }
                        
                        <ReactMarkdown
                            source={item.contenu}
                            escapeHtml={true}
                        />
                        
                        { props.role === 'iconographe' ? <ModifierImage {...props} documentId={item._id} /> : undefined }
    
                    </div>
                )
            }
        });
    } else {

        return (
            <p> le chapitre est fermé</p>
        )
    }
}

export default ListeDocuments;