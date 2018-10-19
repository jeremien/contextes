import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';
import DetailsDocument from './DetailsDocument';

import { List, Button, Modal, Form, Input, Switch, Icon, Card, Carousel } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;

class IndexDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      docId: null,
      contenu: '',
      toggleActionDocList: false,
      // docRejet : false    
    }

    this.showModal = this.showModal.bind(this);
    this.handSaveDoc = this.handSaveDoc.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  showModal() {
    this.setState({
      visible: true
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
      visible: false,
    })
  }

  handleChange(event) {
    this.setState({
      contenu: event.target.value
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

  renderActionDocuments(docId, contenu, rejete, correction) {
    // console.log(rejete)

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
          {correction ? 'Revoir' : 'Corriger'}
        </Button>,
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
        <Button
          type='danger'
          onClick={() => {

            Meteor.call('documents.remove', docId);

            let infos = {
              title: "message de l'éditeur",
              message: "supression du document",
              type: "warning"
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
          disabled={correction}
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

    console.log(this.props.documents)

    if (this.props.documents != 0) {

      return (

        <div>
          <Switch
            defaultChecked={!this.state.toggleActionDocList}
            onChange={() => this.setState({ toggleActionDocList: !this.state.toggleActionDocList })}
            style={{ marginBottom: '20px' }}
          />

          {!this.state.toggleActionDocList &&
            <List
              header={<div>liste des documents</div>}
              bordered
              dataSource={this.props.documents}
              renderItem={item => (

                <List.Item
                  actions={this.renderActionDocuments(item._id, item.contenu, item.rejete, item.correction)}
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
          
          <div>
          {!!this.props.imagesExists &&
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={this.props.images}
              renderItem={item => (
                <List.Item>
                  <Card
                    style={{ width: 300 }}
                    cover={<img
                      src={`/${item.image._id}.${item.image.ext}`}
                      alt="une image"
                      className="thumbnail"
                    />}
                    actions={this.renderActionDocuments(item._id, item.contenu, item.rejete, item.correction)}
                  >
                    <Meta
                      title={`Par ${item.auteur}`}
                      description={`A ${item.creation.toLocaleTimeString()}`}
                    />
                  </Card>
                </List.Item>
              )}
            />
          }
          </div>
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
  const documents = Documents.find({ chapitre: props.chapitre._id, type: "texte" }).fetch();
  const images = Documents.find({ chapitre: props.chapitre._id, type: "image" }).fetch();
  const documentsExists = !loading && !!documents;
  const imagesExists = !loading && !!document;
  return {
    loading,
    documentsExists,
    documents: documentsExists ? documents : [],
    imagesExists,
    images: imagesExists ? images : []
  }
})(IndexDocuments);