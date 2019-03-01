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
            data : [],
            sortDate : false,
            sortContenu : false,
            sortCorrection : false,
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


    componentWillReceiveProps() {
        // console.log('comp will receive props', this.props, this.state)
        // let data = Array.from(this.props.documents)
        this.setState({
            data : this.props.documents
        });
        this.forceUpdate()
    }


    onSortBy(event) {

        // console.log(this.state)

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

        if (data.length > 1) {

            // console.log(this.state)

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
                        <DocumentsShow documents={this.state.data} />
                    </tbody>
                </table>

             )
        } else {

            return <p>chargement</p>
        }

    }
}

export default TableDocuments;

// export default TableDocuments = withTracker((props) => {
//     const documentsHandler = Meteor.subscribe('documents');
//     const loading = !documentsHandler.ready();
//     const documents = Documents.find( { chapitre: props.chapitre._id }, { sort: { creation : -1}} ).fetch();
//     const images = Documents.find({ chapitre: props.chapitre._id, type: "image" }, {fields: {image : 1}}).fetch();
//     const documentsExists = !loading && !!documents;
//     const imagesExists = !loading && !!document;
//     return {
//       loading,
//       documentsExists,
//       documents: documentsExists ? documents : [],
//       imagesExists,
//       images: imagesExists ? images : {}
//     }
//   })(TableDocuments);

