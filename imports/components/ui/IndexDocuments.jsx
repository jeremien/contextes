import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Documents } from '../../api/collections/documents';
import { Images } from '../../api/collections/images';


import { List, Button, Switch, Popconfirm, message } from 'antd';

import DocumentChange from './document/DocumentChange';
import DocumentShow from './document/DocumentShow';

class IndexDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docId: null,
      contenu: '',
      toggleActionDocList: true,
      btnId: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBtnCorrect = this.handleBtnCorrect.bind(this);

  }

  handleDocumentDelete(docId) {
    Meteor.call('documents.remove', docId);
  }
 
  handleChange(event) {
    this.setState({
      contenu: event.target.value
    })
  }

  handleBtnCorrect(e) {

    if (this.state.btnId !== e._id) {
      this.setState({
        btnId: e._id
      });
    } else {
      this.setState({
        btnId: null
      });
    }

  
  }


  renderActionDocuments(item) {

    // console.log(item)

    let docId = item._id;
    let rejete = item.rejete;
    let type = item.type;


    switch(this.props.role) {

      case 'editeur':
          
        return [
                <Button
                  type={item.correction ? 'default' : 'primary'}
                  onClick={() => this.handleBtnCorrect(item)}
                  icon={this.state.btnId === item._id ? 'close' : 'edit'}
                />,
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
                  icon={!rejete ? 'check' : 'loading'}
                />,
                <Popconfirm
                  title='Voulez-vous supprimer le document ?'
                  onConfirm={() => this.handleDocumentDelete(docId)}
                  onCancel={() => message.error('annulation')}
                  okText='oui'
                  cancelText='non'
                >
                  <Button type='danger' icon='delete'/>

                </Popconfirm>
        ]
      
      case 'correcteur':

          return [
            <Button
              type={item.correction ? 'default' : 'primary'}
              onClick={() => this.handleBtnCorrect(item)}
              icon={this.state.btnId === item._id ? 'close' : 'edit'}
            />,
            <Popconfirm
              title='Voulez-vous supprimer le document ?'
              onConfirm={() => this.handleDocumentDelete(docId)}
              onCancel={() => message.error('annulation')}
              okText='oui'
              cancelText='non'
            >
            { rejete ? <Button type='danger' icon='delete'/> : <Button type='danger' disabled icon='delete'/> }
        
            </Popconfirm>
          ]
        
      case 'iconographe':
        
        return [
          <Button
            type={item.correction ? 'default' : 'primary'}
            onClick={() => this.handleBtnCorrect(item)}
            icon={this.state.btnId === item._id ? 'close' : 'edit'}
          />,
          <Popconfirm
             title='Voulez-vous supprimer le document ?'
             onConfirm={() => this.handleDocumentDelete(docId)}
             onCancel={() => message.error('annulation')}
             okText='oui'
             cancelText='non'
           >
            { rejete ? <Button type='danger' icon='delete'/> : <Button type='danger' disabled icon='delete'/> }
        
          </Popconfirm>
        ]

    }

    
  }


  render() {

    // console.log(this.state)

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
                    {this.state.btnId === item._id ? 
                      <DocumentChange {...this.props} item={item} link={link} /> 
                      : <DocumentShow item={item} link={link} />}

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