import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ReactMarkdown from 'react-markdown';

import { Documents } from '../../api/collections/documents';
import { Images } from '../../api/collections/images';

import { Table, Divider, Button, Switch, Icon, message } from 'antd';


class IndexDocumentsTable extends Component {

  constructor(props) {
      super(props);

      this.state = {
        toggleActionDocTable : true,
        publicationData: [],

      }

      this.exportData = this.exportData.bind(this);
      this.exportNewDoc = this.exportNewDoc.bind(this);

  }  

  renderDataTable() {

    const data = this.props.documents.filter((item) => {
      return item.rejete === false;
    })

    return data.map((item, key) => {
        item.key = key;
        return item;
    });

  }

  exportNewDoc() {

    // console.log(this.state.publicationData)

    let newContenu = '';

    this.state.publicationData.forEach((item) => {
      newContenu += ' ' + item.contenu
    })

    // console.log(newContenu)

    Meteor.call('documents.insert', 
                this.props.chapitre.session,
                this.props.chapitre._id,
                newContenu,
                this.props.utilisateur 
                );

    message.success('nouveau document créé');

  }

  exportData() {

    const titre = this.props.chapitre.titre;
    const sessionId = this.props.chapitre.session;

    const getData = this.state.publicationData.map((item) => {

      // console.log(item)
      
      let link = null;
      let arr = [];

      let { contenu, image } = item;

      if (image !== null) {
        let img = Images.findOne({_id: image._id});
        link = img ? img.link() : null;
      }

      if (!link) {

        arr.push(contenu);

      } else {

        arr.push(link);
        arr.push(contenu);
      }
      
      // console.log(arr)
      return arr;
    });

    let contenu = [].concat.apply([], getData);

    const selection = {
      titre,
      contenu
    }

    // console.log(selection);
    Meteor.call('publication.insert', selection, sessionId);
    
    this.props.history.push(`/publications`);

  }

  render() {

    // console.log(this.props)

    const columns = [
        {
            title : 'Contenu',
            dataIndex : 'contenu',
            key: 'contenu',
            render: (item) => <ReactMarkdown source={item} />
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
        {
            title : 'Type',
            dataIndex : 'type',
            key : 'type',
            render: (item) => item != 'image' ? 'texte' : 'image'
        }
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
    
    if (!!this.props.documentsExists) {

      return (

        <div>

          <h4>Publication</h4>
          
          <Switch 
            defaultChecked={!this.state.toggleActionDocTable}
            onChange={() => this.setState({ toggleActionDocTable : !this.state.toggleActionDocTable})}
            style={{ marginBottom: '20px' }}
          />

          { !this.state.toggleActionDocTable &&

            <div>
            
              <div style={{ marginBottom: 16 }}> 
                <Button
                  onClick={this.exportNewDoc}
                >
                  Exporter vers un nouveau document
                </Button>
                <Button
                  onClick={this.exportData}
                >
                  Exporter vers une nouvelle publication
                </Button>
                <Button
                  onClick={() => console.log('update pub')}
                >
                  Ajouter à une publication existante
                </Button>
              </div> 

                <Table 
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    size='small'
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