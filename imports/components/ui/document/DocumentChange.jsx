import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Documents } from '../../../api/collections/documents';

import AjouterImage from '../../outils/iconographe/AjouterImage';

import { Input, Button, message } from 'antd';

class DocumentChange extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contenu : '',
            isCorrected: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.documentSave = this.documentSave.bind(this);

    }

    componentDidMount() {
        this.setState({
            contenu: this.props.item.contenu,
            isCorrected : this.props.isCorrected

        })
    }

    handleChange() {
        this.setState({
            contenu: event.target.value
        });
    }

    documentSave() {
        Meteor.call(
            'documents.update', 
            this.props.item._id, 
            this.state.contenu, 
            this.props.utilisateur
        );
        message.success('le document est enregistré');

    }


    render() {

        let { contenu } = this.state;
        let { correction } = this.props.item;

        // console.log(this.props.link)
        console.log(this.props)

        return (
            <div>
                
                { this.props.role !== 'correcteur' ?
                    <AjouterImage {...this.props} document={this.props.item} simpleBtn={true} /> :
                    undefined
                }
                

                <Input.TextArea
                    // rows={10}
                    autosize={true}
                    value={contenu}
                    onChange={this.handleChange}
                />
                <Button
                    type={ correction ? 'default' : 'primary'}
                    onClick={this.documentSave}
                >
                    Enregistrer
                </Button>
                </div>
        )


     
    }
}

export default DocumentChange;