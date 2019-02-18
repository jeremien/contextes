import React from 'react';

const ListeDocuments = (props) => {

    return props.documents.map((item) => {
        return <p key={item._id}>{item.contenu}</p>
    })

}

export default ListeDocuments;