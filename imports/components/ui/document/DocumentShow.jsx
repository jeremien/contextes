import React from 'react';

const DocumentShow = (props) => {

    // console.log(props.item.contenu)

    if (props.link != undefined) {

        return (

            <div><img src={props.link} width='100px' />{props.item.contenu}</div>
        )

    } else {

        return (

            <div>{props.item.contenu}</div>
        )
    }
  

}

export default DocumentShow;