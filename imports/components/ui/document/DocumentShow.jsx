import React from 'react';
// import ReactMarkdown from 'react-markdown';

const DocumentShow = (props) => {

    // console.log(props.item.contenu)

    if (props.link != undefined) {

        return (

            <div>
                <img src={props.link} />
                {/* <ReactMarkdown
                    source={props.item.contenu}
                /> */}
            </div>
        )

    } else {

        return (
            <div></div>
            // <ReactMarkdown
            //     source={props.item.contenu}
            // />
        )
    }

    // return <ReactMarkdown 
    //             source={props.item.contenu}
    //         />
  

}

export default DocumentShow;