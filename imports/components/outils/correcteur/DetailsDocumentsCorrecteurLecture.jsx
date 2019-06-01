import React from "react";
import ReactMarkdown from 'react-markdown/with-html';
import { getImageLink } from '../../utils/Images';

const DetailsDocumentsCorrecteurLecture = (props) => {
    let link = getImageLink(props.document);

    return <div className="details-documents--elements">
            { link ? <img src={link} /> : undefined } 
            <ReactMarkdown
                source={props.document.contenu}
                escapeHtml={true}
            />
        </div>

}

export default DetailsDocumentsCorrecteurLecture;