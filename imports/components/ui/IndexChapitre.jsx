import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { List, Button, Badge, Popconfirm, message } from 'antd';

export default class IndexChapitres extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen : true
    }

    this.getBadge=this.getBadge.bind(this)
    this.handleChapitreFermer = this.handleChapitreFermer.bind(this);
  }

  handleChapitreFermer() {
    this.setState( prevState => ({
      isOpen : !prevState.isOpen
    }))
  }

  handleChapitreDelete(chapitreId) {
    Meteor.call('chapitres.remove', chapitreId);
    
    let chapitre = this.props.chapitres.find((item) => {
        return item._id === chapitreId;
      });

    let infos = {
            title: `message de ${this.props.utilisateur}, l'éditeur`,
            message: `suppression du chapitre : ${chapitre.titre}`,
            type: "warning"
          }

    Meteor.call('notification', infos);
    Meteor.call('log.insert', 'notification', infos.message );
  }

  renderActionsChapitres(chapitreId, sessionId) {
    if (!!this.props.connecte
      && this.props.role === "editeur") {
      return [

        <Button
          onClick={() => {
            this.props.history.push(`/session/${sessionId}/chapitre/${chapitreId}`)
          }}>
          voir
        </Button>,
         <Button
         onClick={this.handleChapitreFermer}>
         { this.state.isOpen ? 'ouvert' : 'fermer' }
        </Button>,
        <Popconfirm 
          title='Voulez-vous supprimer le chapitre ?'
          onConfirm={() => this.handleChapitreDelete(chapitreId)}
          onCancel={() => message.error('annulation')}
          okText='oui'
          cancelText='non'
        >
          <Button type='danger'>supprimer</Button>
        </Popconfirm>

      ]
    } else {
      return [

        <Button
          type='primary'
          onClick={() => {

            let infos = {
              title: "message",
              message: `${this.props.utilisateur} a rejoint le chapitre`,
              type: "success"
            }

            Meteor.call('notification', infos);
            Meteor.call('log.insert', 'notification', infos.message );

            this.props.history.push(`/session/${sessionId}/chapitre/${chapitreId}`);

          }}>
          rejoindre
              </Button>
      ]
    }
  }

  renderBadgeChapitre(item) {

    return (
      <Badge count={0} >
        {item.titre}
      </Badge>)
  }

  getBadge(chapitre) {
    var nombre = 0

    this.props.badges.map((badge) => {
      if (badge._id == chapitre) {
        nombre = badge.sum
      }
    })

    return nombre
  }

  render() {

    // console.log(this.props.chapitres[0])

    if (this.props.loading) {
      return (
        <h3>Chargement en cours</h3>
      )
    }
    if (this.props.chapitresExists) {

      return (

        <List
          header={<div>{`liste des chapitres de la session ${this.props.session.titre}`}</div>}
          bordered
          dataSource={this.props.chapitres}
          renderItem={item => (
            <List.Item
              actions={this.renderActionsChapitres(item._id, item.session)}
            >

              <Badge count={this.getBadge(item._id)} >
                {item.titre}
              </Badge>

            </List.Item>

          )}
        />

      )
    }

    return (
      <h3>Cette session ne contient pas encore de chapitre</h3>
    )
  }
}
