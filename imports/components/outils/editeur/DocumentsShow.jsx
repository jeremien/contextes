import React, { Component } from 'react';
import Moment from 'react-moment';
import { Meteor } from 'meteor/meteor';
import ReactMarkdown from 'react-markdown/with-html';

import { getImageLink } from '../../utils/Images';
import ButtonRejet from './ButtonRejet';

class DocumentsShow extends Component {

    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleSelectedChange = this.handleSelectedChange.bind(this);
    }

    handleRemove(id) {
        Meteor.call('documents.remove', id);
    }

    renderRefs(id) {
        return this.props.documents.map((item) => { 
           return <option key={item.ref} value={item.ref} data-id={id}>{item.ref}</option> 
        });
    }

    handleSelectedChange(event, id, oldRef, chapitre) {
        Meteor.call('documents.ref.update', id, event.target.value, oldRef, chapitre);

    }

    render() {

        return this.props.documents.map((data) => {
            
            let link = getImageLink(data);

            return (
                <tr key={data._id} data-id={data._id} >
                      <td><span>

                        <ButtonRejet rejete={data.rejete} id={data._id} />

                        { !this.props.verrou ?  
                            <button className="btt bcr bg fcr py txta mt" onClick={() => {
                            if (window.confirm('supprimer ce document ?'))
                            this.handleRemove(data._id)
                            }}>supprimer</button> :
                            undefined 
                        }

                    </span></td>
                    <td><span><select value={data.ref} onChange={(event) => this.handleSelectedChange(event, data._id, data.ref, data.chapitre)}>{this.renderRefs(data._id)}</select></span></td>
                    <td><span><Moment format='HH:mm:ss'>{data.creation}</Moment></span></td>
                    <td><span>{ link ? <img src={link} /> : undefined }   
                        <ReactMarkdown
                            source={data.contenu}
                            escapeHtml={false}
                        />
                    </span></td>
                    <td><span>{ data.correction ? 'oui' : 'non' }</span></td>
                    <td><span>{ data.rejete ? 'non' : 'oui' }</span></td>
                    <td><span>{ data.auteur }</span></td>
                    <td><span>{ data.type }</span></td>
                </tr>
            )
        });
    }
}

export default DocumentsShow;