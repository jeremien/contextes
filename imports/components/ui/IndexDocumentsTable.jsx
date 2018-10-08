import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';

import { Table, Divider, Button, Switch } from 'antd';

class IndexDocumentsTable extends Component {

  constructor(props) {
      super(props);

      this.state = {
        toggleActionDocTable : true
      }

  }  

  renderDataTable() {

    return this.props.documents.map((item, key) => {
        item.key = key;
        return item;
    });

  }

  render() {

    // console.log(this.props.documents)

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
            render: (item) => item.toString()
        },
        {
            title : 'Rejeté',
            dataIndex : 'rejete',
            key: 'rejete',
            render: (item) => item.toString()
        }

    ];

    const data = this.renderDataTable();
    // console.log(data)

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
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