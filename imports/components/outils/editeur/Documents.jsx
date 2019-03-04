import React, { Component } from 'react';
import Moment from 'react-moment';
import { Meteor } from 'meteor/meteor';

class Documents extends Component {

    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(id) {
    
        Meteor.call('documents.remove', id);
        this.forceUpdate()

     
    }

    render() {

        return this.props.documents.map((data, key) => {
    
            return (
                <tr key={key} data-id={data._id} >
                    
                    <td><span><Moment format='HH:mm:ss'>{data.creation}</Moment></span></td>
                    <td><span>{ data.contenu }</span></td>
                    <td><span>{ data.correction ? 'oui' : 'non' }</span></td>
                    <td><span>{ data.auteur }</span></td>
                    <td><span>{ data.type }</span></td>
                    <td><span><button onClick={() => this.handleRemove(data._id)}>supprimer</button></span></td>
                
                </tr>
            )
    
        });


    }

}

export default Documents;