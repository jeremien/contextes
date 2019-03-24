import React, { Component } from 'react';
import DocumentsShow from './DocumentsShow';
import { sortData } from '../../utils/Sort';

class TableDocuments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data : [],
            sortRef : false,
            sortDate : false,
            sortContenu : false,
            sortCorrection : false,
            sortRejet : false,
            sortAuteur : false,
            sortType : false
        }

        this.onSortBy = this.onSortBy.bind(this);

    }

    componentWillMount() {
        this.setState({
            data : this.props.documents
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.documents !== this.props.documents) {
            this.setState({
                data : nextProps.documents
            });
        }
    }

    onSortBy(event) {

        let id = event.target.dataset.id;
        let { data, sortRef, sortDate, sortContenu, sortCorrection, sortRejet, sortAuteur, sortType } = this.state;

        switch (id) {

            case 'ref':
                this.setState({
                    data : sortData(data, 'ref', sortRef),
                    sortRef : !sortRef
                });
                break;

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

            case 'rejet':
                this.setState({
                    data : sortData(data, 'rejet', sortRejet),
                    sortRejet : !sortRejet
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
                            <td data-id='ref'>réf.</td>
                            <td data-id='date'>heure</td>
                            <td data-id='contenu'>contenu</td>
                            <td data-id='correction'>correction</td>
                            <td data-id='rejet'>validation</td>
                            <td data-id='auteur'>auteur</td>
                            <td data-id='type'>type</td>
                            <td data-id='action'>action</td>
                        </tr>
                    </thead>
                    <tbody className='table-documents--content'>
                        <DocumentsShow documents={data} />
                    </tbody>
                </table>

             )
        } else {

            return <p>chargement</p>
        }

    }
}

export default TableDocuments;
