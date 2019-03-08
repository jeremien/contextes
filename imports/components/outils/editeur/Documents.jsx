import React, { Component } from 'react';
import Moment from 'react-moment';
import { Meteor } from 'meteor/meteor';
import { getImageLink } from '../../utils/Images';

class Documents extends Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(id) {
        Meteor.call('documents.remove', id);
    }

    render() {

        return this.props.documents.map((data) => {
            
            let link = getImageLink(data);

            return (
                <tr key={data._id} data-id={data._id} >
                    
                    <td><span><Moment format='HH:mm:ss'>{data.creation}</Moment></span></td>
                    <td><span>{ link ? <img src={link} /> : undefined }   { data.contenu }</span></td>
                    <td><span>{ data.correction ? 'oui' : 'non' }</span></td>
                    <td><span>{ data.auteur }</span></td>
                    <td><span>{ data.type }</span></td>
                    <td><span><button onClick={() => {
                        if (window.confirm('supprimer ce document ?'))
                        this.handleRemove(data._id)
                    }}>supprimer</button></span></td>
                
                </tr>
            )
        });
    }
}

export default Documents;