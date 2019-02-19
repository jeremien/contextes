import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Images } from '../../api/collections/images';


import Moment from 'react-moment';

const ListeDocuments = (props) => {

    return props.documents.map((item) => {

        let img, link;

        if (item.image != null) {
            img = Images.findOne({_id: item.image._id})
            link = img ? img.link() : null;
        }

        return (
                <div key={item._id} className='wmax'>  
                    <p className='cff'><Moment format='HH:mm:ss'>{item.creation}</Moment></p>
                    
                    { link ? <img src={link}/> : undefined }
                    
                    <ReactMarkdown
                        source={item.contenu}
                    />
                </div>
            )
    })

}

export default ListeDocuments;