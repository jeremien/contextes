import React from 'react';
import Moment from 'react-moment';
import { Meteor } from 'meteor/meteor';

const Documents = (props) => {

    return props.documents.map((data, key) => {

        // console.log(data.correction)

        return (
            <tr key={key} data-id={data._id} >
                
                <td><span><Moment format='HH:mm:ss'>{data.creation}</Moment></span></td>
                <td><span>{ data.contenu }</span></td>
                <td><span>{ data.correction ? 'oui' : 'non' }</span></td>
                <td><span>{ data.auteur }</span></td>
                <td><span>{ data.type }</span></td>
                <td><span><button onClick={() => {
                    
                    Meteor.call('documents.remove', data._id)
                    // console.log(data._id)
                    }
                }>supprimer</button></span></td>
            
            </tr>
        )

    });

}

export default Documents;