import React, { Component } from 'react';

import DocumentChange from './DocumentChange';
import { Images } from '../../../api/collections/images';


const DetailsDocumentEdition = (props) => {

    let link;

    if (props.image !== null) {
        let img = Images.findOne({_id: props.image._id});
        link = img ? img.link() : null;
      }


    return <DocumentChange {...props} item={props} link={link}/>



}

export default DetailsDocumentEdition;