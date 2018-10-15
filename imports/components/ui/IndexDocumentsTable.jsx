import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';

import { Table, Divider, Button, Switch, Icon } from 'antd';

// import PublicationPDF from '../outils/editeur/PublicationPDF';

class IndexDocumentsTable extends Component {

  constructor(props) {
      super(props);

      this.state = {
        toggleActionDocTable : true,
        publicationData: []
      }

      this.exportData = this.exportData.bind(this);

  }  

  renderDataTable() {

    console.log(this.props.documents)

    // filtrer les docs rejetés / toggle bouton pour changer l'état

    return this.props.documents.map((item, key) => {
        item.key = key;
        return item;
    });

  }

  exportData() {

    const titre = this.props.chapitre.titre;

    const contenu = this.state.publicationData.map((item) => {
      return item.contenu;
    });

    const selection = {
      titre,
      contenu
    }

    // console.log(texte)

    Meteor.call('publication.insert', selection);

    // return <PublicationPDF/>;

    // reedirection vers la publication
    this.props.history.push(`/publications`);

  }

  render() {

    // console.log(this.props)
    // console.log('state', this.state.publicationData)

    const columns = [

        {
            title : 'Contenu',
            dataIndex : 'contenu',
            key: 'contenu',
            render: (item) => item.substring(0, 10)
        },
        // {
        //     title : 'Auteur',
        //     dataIndex : 'auteur',
        //     key: 'auteur'
        // },
        {
            title : 'Creation',
            dataIndex : 'creation',
            key: 'creation',
            render: (item) => item.toLocaleTimeString()
        },
        {
            title : 'Corrigé',
            dataIndex : 'correction',
            key: 'correction',
            // render: (item) => item.toString()
            render: (item) => item ? <Icon type='check-circle' style={{ color : 'green'}} /> : <Icon type='close-circle' style={{ color : 'red'}} />
        },
        // {
        //     title : 'Rejeté',
        //     dataIndex : 'rejete',
        //     key: 'rejete',
        //     render: (item) => item.toString()
        // }

    ];

    const data = this.renderDataTable();
    // console.log(data)

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys, selectedRows);
        // console.log('keys', selectedRowKeys)
        // console.log('data', selectedRows)
        this.setState({ publicationData : selectedRows })
      }
    }
    
    if (this.props.documents != 0) {

      return (


        <div>
          
          <Switch 
            defaultChecked={!this.state.toggleActionDocTable}
            onChange={() => this.setState({ toggleActionDocTable : !this.state.toggleActionDocTable})}
            style={{ marginBottom: '20px' }}
          />

          { !this.state.toggleActionDocTable &&

            <div>
            
              <div style={{ marginBottom: 16 }}> 
                <Button
                  onClick={this.exportData}
                >
                  Exporter
                </Button>
              </div> 

                <Table 
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                />

            </div>
          }    

        </div>

      );

    } else {

      return (
        <div>
          <h3>pas de documents</h3>
        </div>
      )

    }


  }
}

export default IndexDocumentsTable = withTracker((props) => {
  const documentsHandler = Meteor.subscribe('documents');
  const loading = !documentsHandler.ready();
  const documents = Documents.find({ chapitre: props.chapitre._id }).fetch()
  const documentsExists = !loading && !!documents;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : []
  }
})(IndexDocumentsTable);