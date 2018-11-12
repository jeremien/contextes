import React from 'react';

const DocumentShow = (props) => {

    // console.log(props)

    if (props.link != undefined) {

        return (

            <div><img src={props.link} width='100px' />{props.contenu}</div>
        )

    } else {

        return (

            <div>{props.contenu}</div>
        )
    }
  

}

export default DocumentShow;