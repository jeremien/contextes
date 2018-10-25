import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';
import DetailsDocument from './DetailsDocument';

import { List, Button, Modal, Form, Input, Switch, Icon, Card, Carousel, Avatar, Divider } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;

const url = 'http://192.168.66.9:3000';

class IndexDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTexte: false,
      visibleImage: false,
      docId: null,
      contenu: '',
      toggleActionDocList: false,
      url: null,
      isImage: false
      // docRejet : false    
    }

    this.showModal = this.showModal.bind(this);
    this.handleSaveDoc = this.handleSaveDoc.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  showModal(type) {
    // console.log(type)

    if (type != 'image') {

      this.setState({
        visibleTexte: true,
        isImage: false
      });

    } else {

      this.setState({
        visibleImage: true,
        isImage : true
      });

    }

   
  }

  handleSaveDoc() {

    this.setState({
      visibleTexte: false,
      visibleImage: false
    })

  }

  handleCancel() {
    this.setState({
      visibleTexte: false,
      visibleImage: false
    })
    
  }

  handleChange(event) {
    this.setState({
      contenu: event.target.value
    })
  }

  // renderContenuList(item) {

  //   // TODO : récupérer l'url dynamiquement

  //   switch (item.type) {

  //     case 'texte' :
  //       return `${item.contenu.split(' ')[0].toString()}...`;

  //     case 'image' :

  //       let str = item.image.path;
  //       let img = str.substr(str.lastIndexOf('/') + 1)
  //       let res = `${url}/${img}`;

  //       // TODO : tester s'il y a du texte en contenu

  //       return <Avatar src={res} />;

  //     default : 
  //       console.log('no type')

  //   }

    
  // }

  renderActionDocuments(item) {

    let docId = item._id;
    let contenu = item.contenu;
    let correction = item.correction;
    let rejete = item.rejete;
    let type = item.type;
    let res = null;

    if (type === 'image') {
      let str = item.image.path;
      let img = str.substr(str.lastIndexOf('/') + 1)
      res = `${url}/${img}`;
    }  

    // TODO : tester si c'est une image ou du texte
    // si c'est iconographe > ajouter une image

    if (!!this.props.connecte
      && this.props.role === "editeur") {


          return [

            <Button
              type='default'
              onClick={() => {
                this.showModal(type);
                this.setState({
                  docId,
                  contenu,
                  url : res
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

    } else if (!!this.props.connecte
               && this.props.role === "correcteur") {

      return [

        <Button
          type='primary'
          // disabled={correction}
          onClick={() => {
            this.showModal(type);
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

    } else if (!!this.props.connecte
               && this.props.role === "iconographe" 
               && type === 'image') {

        return [

          <Button
            type='primary'
            // disabled={correction}
            onClick={() => {
              this.showModal(type);
              this.setState({
                docId,
                contenu,
                url : res
              })
            }
  
            }
          >
            Compléter
            </Button>
        ]
    
    } else {

      return []

    }
  }


  render() {

    // console.log(this.state)

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
              renderItem={ (item, index) => { 

                let type = item.type;
                let rejete = item.rejete;
                
                // console.log(type, rejete)

                // TODO : rendre que les documents non rejetés pour les autres rôles que l'éditeur


                if (item.type != 'image') {

                  return  (
                            <List.Item
                              actions={this.renderActionDocuments(item)}
                           >  
                              {index + ' : ' + item.contenu.split(' ')[0].toString() + '...'}

                              <Modal
                                title='Modifier le document'
                                visible={this.state.visibleTexte}
                                onOk={() => {
                                  Meteor.call('documents.update', this.state.docId, this.state.contenu, this.props.utilisateur)
                                  this.setState({
                                    visibleTexte: false,
                                    visibleImage: false,
                                    contenu: '',
                                    url : null
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
                          )

                } else {

                  let str = item.image.path;
                  let img = str.substr(str.lastIndexOf('/') + 1)
                  let res = `${url}/${img}`;

                  return (
                          <List.Item
                            actions={this.renderActionDocuments(item)}
                          >
                              { !!item.contenu ? index + ' : ' + item.contenu.split(' ')[0].toString() + '...' : undefined}
                              <Avatar src={res} />

                              <Modal
                                title="Modifier la légende de l'image"
                                visible={this.state.visibleImage}
                                onOk={() => {
                                  Meteor.call('documents.update', this.state.docId, this.state.contenu, this.props.utilisateur)
                                  this.setState({
                                    visibleTexte: false,
                                    visibleImage: false,
                                    contenu: '',
                                    url : null
                                  })
                                }}
                                onCancel={this.handleCancel}
                              > 
                                <img src={this.state.url} width='200px' />
                                
                                <Divider />

                                <TextArea
                                  value={this.state.contenu}
                                  onChange={this.handleChange}
                                  autosize={{ minRows: 2, maxRows: 60 }}
                                /> 

                              </Modal>

                          </List.Item>
                        )
                }





                
                // return (

                //   <List.Item
                //     // style={{ backgroundColor='red'}}
                //     // avatar={<Avatar src=}
                //     actions={this.renderActionDocuments(item)}
                //   > 
                    
                //   {/* ({index}) {this.renderContenuList(item)} */}

                //     <Modal
                //       title='Modifier le document'
                //       visible={this.state.visible}
                //       onOk={() => {
                //         Meteor.call('documents.update', this.state.docId, this.state.contenu, this.props.utilisateur)
                //         this.setState({
                //           visible: false,
                //           contenu: ''
                //         })
                //       }}
                //       onCancel={this.handleCancel}
                //     >
                      
                      

                //       {/* {this.renderContenuModal(item)} */}

                //       {/* <img src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />

                //       <TextArea
                //         value={this.state.contenu}
                //         onChange={this.handleChange}
                //         autosize={{ minRows: 10, maxRows: 60 }}
                //       /> */}

                //     </Modal>

                //   </List.Item>

                // ) 
            }}
            />
          }
          
          {/* <div>
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
          </div> */}

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
  // const documents = Documents.find({ chapitre: props.chapitre._id, type: "texte" }).fetch();
  const documents = Documents.find( { chapitre: props.chapitre._id }).fetch();
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