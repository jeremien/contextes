import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
// import { Documents } from '../../../api/collections/documents';

import DocumentsShow from './Documents';

import { sortData } from '../../utils/Sort';


class TableDocuments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : props.documents,
            sortDate : false,
            sortContenu : false,
            sortCorrection : false,
            sortAuteur : false,
            sortType : false
        }

        this.onSortBy = this.onSortBy.bind(this);

    }

    // componentWillMount() {
    //     this.setState({
    //         data : this.props.documents
    //     });
    // }


    componentWillReceiveProps() {
        this.setState({
            data : this.props.documents
        });
        this.forceUpdate()
    }


    onSortBy(event) {

        let id = event.target.dataset.id;
        let { data, sortDate, sortContenu, sortCorrection, sortAuteur, sortType } = this.state;


        switch (id) {

            case 'date':
                this.setState({
                    data : sortData(data, 'date', sortDate),
                    sortDate : !sortDate
                });
                break;

            case 'contenu':
                this.setState({
                    data : sortData(data, 'contenu', sortContenu),
                    sortContenu : !sortContenu
                });
                break;
            
            case 'correction':
                this.setState({
                    data : sortData(data, 'correction', sortCorrection),
                    sortCorrection : !sortCorrection
                });
            break;
            
            case 'auteur':
                this.setState({
                    data : sortData(data, 'auteur', sortAuteur),
                    sortAuteur : !sortAuteur
                });
                break;
            
            case 'type':
                this.setState({
                    data : sortData(data, 'type', sortType),
                    sortType : !sortType
                });
                break;
            
            default:
                console.log('no sort')
        }
    }

    render() {

        let { data } = this.state;

        if (data.length > 0) {

              return (

                <table>
                    <thead>
                        <tr className="table-documents--head" onClick={this.onSortBy}>
                            <td data-id='date'>date</td>
                            <td data-id='contenu'>contenu</td>
                            <td data-id='correction'>correction</td>
                            <td data-id='auteur'>auteur</td>
                            <td data-id='type'>type</td>
                            <td data-id='supprimer'>supprimer</td>
                        </tr>
                    </thead>
                    <tbody className='table-documents--content'>
                        <DocumentsShow documents={this.props.documents} />
                    </tbody>
                </table>

             )
        } else {

            return <p>chargement</p>
        }

    }
}

export default TableDocuments;
