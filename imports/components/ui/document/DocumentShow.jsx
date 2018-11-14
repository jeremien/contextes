import React from 'react';
import ReactMarkdown from 'react-markdown';

const DocumentShow = (props) => {

    // console.log(props.item.contenu)

    // if (props.link != undefined) {

    //     return (

    //         <div><img src={props.link} width='100px' /><p>{props.item.contenu}</p></div>
    //     )

    // } else {

    //     return (

    //         <div>{props.item.contenu}</div>
    //     )
    // }

    return <ReactMarkdown 
                source={props.item.contenu}
            />
  

}

export default DocumentShow;