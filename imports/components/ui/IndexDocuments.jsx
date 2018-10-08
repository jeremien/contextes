import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';
import DetailsDocument from './DetailsDocument';
// import AjouterImage from '../outils/editeur/AjouterImage'

import { List, Button, Modal, Form, Input, Switch } from 'antd';

const { TextArea } = Input;

class IndexDocuments extends Component {


  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      docId : null,
      contenu: '',
      toggleActionDocList : false
      // docRejet : false    
    }

    this.showModal = this.showModal.bind(this);
    this.handSaveDoc = this.handSaveDoc.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  showModal() {
    this.setState({
      visible : true
    });
  }

  handSaveDoc() {
    this.setState({
      visible: false,
    })

    // let infos = {
    //   title : "message du correcteur",
    //   message : "correction du document",
    //   type : "success"
    // }

    // Meteor.call('notification', infos);
   
  }

  handleCancel() {
    this.setState({
      visible : false,
    })
  }

  handleChange(event) {
    this.setState({
      contenu : event.target.value
    })
  }

  getFirstWords(str) {
    // const parseStr = (str) => {
    //   let str = str.slice(0, 5);
    //   return str;
    // }

    // console.log(str)
    // return parseStr;
  }

  renderActionDocuments(docId, contenu) {


    if (!!this.props.connecte 
      && this.props.role === "editeur") {
    
        return [

          <Button
            type='default'
            onClick={() => {
              this.showModal();
              this.setState({
                docId,
                contenu,
              })
            }
              
          }
          >
          Voir
          </Button>,
          <Button
            type='default'
            onClick={() => {
              Meteor.call('documents.rejet', docId);
              // this.setState({
              //   docRejet: !this.state.docRejet
              // })
            }
          }
          >
          Rejeter
          </Button>,
          <Button
            type='danger'
            onClick={() => {
              
              Meteor.call('documents.remove', docId);

              let infos = {
                title : "message de l'éditeur",
                message : "suppresion du document",
                type : "warning"
              }
          
              Meteor.call('notification', infos);

            }}
          >
            Supprimer
          </Button>
           

        ]

      } else {

        return [

          <Button
            type='primary'
            onClick={() => {
              this.showModal();
              this.setState({
                docId,
                contenu,
              })
            }
              
            }
          >
          Corriger
          </Button>
        ]

      }
  }


  render() {

    // const { visible, confirmLoading } = this.state;

    // console.log(this.props.documents)
    // console.log(this.state)
    
    if (this.props.documents != 0) {

      return (

          <div>

              <Switch 
                defaultChecked={!this.state.toggleActionDocList}
                onChange={() => this.setState({ toggleActionDocList : !this.state.toggleActionDocList})}
                style={{ marginBottom: '20px' }}
              />

              { !this.state.toggleActionDocList &&
                <List 
                  header={<div>liste des documents</div>}
                  bordered
                  dataSource={this.props.documents}
                  renderItem={item => (

                    <List.Item
                      actions={this.renderActionDocuments(item._id, item.contenu)}
                    >
                      {item.contenu} 

                      {/* {this.getFirstWords(item.contenu)} */}

                      <Modal
                        title='document'
                        visible={this.state.visible}
                        onOk={() => {
                          Meteor.call('documents.update', this.state.docId, this.state.contenu, this.props.utilisateur)
                          this.setState({
                            visible: false,
                            contenu: ''
                          })
                        }}
                        onCancel={this.handleCancel} 
                      >

                        <TextArea
                          value={this.state.contenu}
                          onChange={this.handleChange}
                          autosize={{ minRows: 10, maxRows: 60 }}
                        /> 

                      </Modal>

                    </List.Item>
            
                    )}
          
                  />
              } 


          </div>
          
        

       

        // <div className="index-documents">
        //   <h3>Liste des documents</h3>
        //   {this.props.documents.map((document) =>
        //   <div key={document._id}>
        //     <DetailsDocument  document={document} />
        //     {/* <AjouterImage  document={document} chapire = {this.props.chapitre} /> */}
        //     </div>
        //   )}
        // </div>

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
  const documents = Documents.find({ chapitre: props.chapitre._id }).fetch()
  const documentsExists = !loading && !!documents;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : []
  }
})(IndexDocuments);