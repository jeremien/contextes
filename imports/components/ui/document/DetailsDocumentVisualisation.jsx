import React from 'react';
// import ReactMarkdown from 'react-markdown';
import { Images } from '../../../api/collections/images';


const DetailsDocumentVisualisation = (props) => {

    // console.log(props)

    let link, contenu;

    if (props.image !== null) {
        let img = Images.findOne({_id: props.image._id});
        link = img ? img.link() : null;

        if (props.contenu !== undefined) {
            contenu = `![image](${link})  
                        ${props.contenu}`
        
        } else {
            contenu = `![image](${link})`
        }
        
    
    } else {

        contenu = ` ${props.contenu} `;
    }
    

    // console.log(link)

    return <div className='visualisation'>
                {/* <img src={link} /> */}
                {/* <ReactMarkdown
                    source={contenu}
                /> */}
            </div>

}

export default DetailsDocumentVisualisation;