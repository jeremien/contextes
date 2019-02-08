import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ReactMarkdown from 'react-markdown';

import { Documents } from '../../api/collections/documents';
import { Images } from '../../api/collections/images';

import { Table, Divider, Button, Switch, Icon, message, Popconfirm } from 'antd';


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

  handleDocumentDelete(docId) {
    Meteor.call('documents.remove', docId);
  }

  renderDataTable() {

    return this.props.documents.map((item, key) => {
      item.key = key;
      return item;
    });

  }

  exportNewDoc() {

    if (this.state.publicationData.length === 0) {
      message.error("il n'y a pas de documents !");
      return;
    }

    let newContenu = '';

    this.state.publicationData.forEach((item) => {
      newContenu += `${item.contenu} `;

    })

    Meteor.call('documents.insert', 
                this.props.chapitre.session,
                this.props.chapitre._id,
                newContenu,
                this.props.utilisateur 
                );

    

    message.success('le nouveau est document créé');

  }

  exportData() {

    const titre = this.props.chapitre.titre;
    const sessionId = this.props.chapitre.session;

    const getData = this.state.publicationData.map((item) => {
      
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

        arr.push(`![image](${link})`);
        arr.push(contenu);
      }
      
      return arr;
    });

    let contenu = [].concat.apply([], getData);

    const selection = {
      titre,
      contenu
    }

    Meteor.call('publication.insert', selection, sessionId);
    
    this.props.history.push(`/publications`);

  }

  render() {

    const columns = [
        {
            title : 'Texte',
            dataIndex : 'contenu',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
              return !a.contenu - !b.contenu

            },
            render: (item) => {
              if (!item) {
                return <Icon type='close-circle' style={{ color : 'red'}} />
              } else {
                return <Icon type='check-circle' style={{ color : 'green'}} /> 
              }
            }
        },

        {
          title : 'Image',
          dataIndex : 'image',
          defaultSortOrder: 'descend',
          sorter: (a, b) => {
            return !a.image - !b.image
          },
          render: (item) => {
            if (!item) {
              return <Icon type='close-circle' style={{ color : 'red'}} />
            } else {
              return <Icon type='check-circle' style={{ color : 'green'}} /> 
            }
          }
        },

        {
            title : 'Création',
            dataIndex : 'creation',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.creation - b.creation,
            render: (item) => item.toLocaleTimeString()
        },
        {
            title : 'Correction',
            dataIndex : 'correction',
            defaultSorterOrder: 'descend',
            sorter: (a, b) => a.correction - b.correction,
            render: (item) => item ? <Icon type='check-circle' style={{ color : 'green'}} /> : <Icon type='close-circle' style={{ color : 'red'}} />
        },
        {
            title : 'Action',
            key : 'action',
            render : (item) => {
              return (
                <Button.Group>
                  <Button
                  type='default'
                  onClick={() => {
                    if (!item.rejete) {
                      // console.log('rejete')
                      Meteor.call('documents.rejet', item._id);
                    } else {
                      // console.log('accepter')
                      Meteor.call('documents.accepte', item._id);
                    }
                  }
                }
                  icon={!item.rejete ? 'check' : 'loading'}
                />
                  <Popconfirm
                    title='Voulez-vous supprimer le document ?'
                    onConfirm={() => this.handleDocumentDelete(item._id)}
                    onCancel={() => message.error('annulation')}
                    okText='oui'
                    cancelText='non'
                  >
                    <Button type='danger' icon='delete'/>
                  </Popconfirm>
                </Button.Group>
              )
            }
        }
     

    ];

    const data = this.renderDataTable();

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
    
        this.setState({ publicationData : selectedRows })
      }
    }
    
    if (!!this.props.documentsExists) {

      return (

        <div>


            <div>
            
              <div style={{ marginBottom: 16 }}> 
     
                <Button
                    disabled 
                    onClick={this.exportNewDoc}>
                    Fusionner les documents 
                </Button>
                <Button
                  onClick={this.exportData}
                >
                  Exporter vers un fichier 
                </Button>
       
       
              </div> 

                <Table 
                    rowSelection={rowSelection}
                    columns={columns}
                    expandedRowRender={(data) => {

                      if (!data.image) {
                        
                        return <ReactMarkdown source={data.contenu} />

                      } else {

                        let img, link, contenu;

                        if (data.image != null) {
                          img = Images.findOne({_id: data.image._id})
                          link = img ? img.link() : null;
                        }

                        if (data.contenu === undefined) {
                          return <img src={link} />
                        } else {
                          let contenu = `![image](${link}) ${data.contenu}`
                          return <ReactMarkdown source={contenu} />
                        }

                      }

                    }}
                    dataSource={data}
                    size='small'
                />

            </div>
          {/* }     */}

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