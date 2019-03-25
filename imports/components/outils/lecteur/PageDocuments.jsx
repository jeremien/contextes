import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { getImageLink } from '../../utils/Images';


const PageDocuments = (props) => {

    return props.documents.map((item) => {

        if (!item.rejete) {

            let link = getImageLink(item);

            return (
                <div key={item._id} className="page-documents--element">  
                                        
                    { link ? <img src={link} /> : undefined } 
                    
                    <ReactMarkdown
                        source={item.contenu}
                        escapeHtml={false}
                    />
                    
                </div>
            )
        }

    });
}

export default PageDocuments;