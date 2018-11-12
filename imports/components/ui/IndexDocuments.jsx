import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';
import { Images } from '../../api/collections/images';


import { List, Button, Switch, Popconfirm } from 'antd';

import DocumentChange from './document/DocumentChange';
import DocumentShow from './document/DocumentShow';

class IndexDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docId: null,
      contenu: '',
      toggleActionDocList: true,
    }

    this.handleChange = this.handleChange.bind(this);

  }

  handleDocumentDelete(docId) {
    Meteor.call('documents.remove', docId);
  }
 
  handleChange(event) {
    this.setState({
      contenu: event.target.value
    })
  }


  renderActionDocuments(item) {

    let docId = item._id;
    let rejete = item.rejete;
    
    if (!!this.props.connecte
      && this.props.role === "editeur") {

        return [
          <Button
            type='default'
            onClick={() => {
              if (!rejete) {
                console.log('rejete')
                Meteor.call('documents.rejet', docId);
              } else {
                console.log('accepter')
                Meteor.call('documents.accepte', docId);
              }
            }
          }
          >
            {rejete ? 'Accepter' : 'Rejeter'}
          </Button>,
          <Popconfirm
            title='Voulez-vous supprimer le document ?'
            onConfirm={() => this.handleDocumentDelete(docId)}
            onCancel={() => message.error('annulation')}
            okText='oui'
            cancelText='non'
          >
            <Button
              type='danger'
            >
            Supprimer
            </Button>
          </Popconfirm>
        ]

      } else {

        return [];
      }
    
  }


  render() {

    // console.log(this.state, this.modifContent)

    if (this.props.documents != 0) {

      return (

        <div>

          { this.props.role === 'editeur' && 
            <div>
              <h4>Transcription</h4>
              <Switch
                defaultChecked={this.state.toggleActionDocList}
                onChange={() => this.setState({ toggleActionDocList: !this.state.toggleActionDocList })}
                style={{ marginBottom: '20px' }}
              />
            </div>
          }
      
          {this.state.toggleActionDocList &&
            <List
              header={<div>liste des documents</div>}
              bordered
              dataSource={this.props.documents}
              renderItem={ (item) => { 

                let img, link;

                if (item.image != null) {
                  img = Images.findOne({_id: item.image._id})
                  link = img ? img.link() : null;
                }

                return  (
                  <List.Item
                    actions={this.renderActionDocuments(item)}
                  >  
                      { this.props.role === 'editeur' &&
                        <DocumentShow {...item} link={link} />
                      }
                    
                      { this.props.role === 'correcteur' &&
                        <DocumentChange {...this.props} item={item} link={link} />
                      }

                      { this.props.role === 'iconographe' && 
                        <DocumentShow {...item} link={link} />
                      }

                  </List.Item>
                )
            
            }}
            />
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

export default IndexDocumentsContainer = withTracker((props) => {
  const documentsHandler = Meteor.subscribe('documents');
  const loading = !documentsHandler.ready();
  const documents = Documents.find( { chapitre: props.chapitre._id }).fetch();
  const images = Documents.find({ chapitre: props.chapitre._id, type: "image" }, {fields: {image : 1}}).fetch();
  const documentsExists = !loading && !!documents;
  const imagesExists = !loading && !!document;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : [],
    imagesExists,
    images: imagesExists ? images : {}
  }
})(IndexDocuments);