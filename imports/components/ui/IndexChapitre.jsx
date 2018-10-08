import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

import { Chapitres } from '../../api/collections/chapitres';

import { List, Button } from 'antd';

class IndexChapitres extends Component {

  constructor(props) {
    super(props);
  }

  renderActionsChapitres(chapitreId, sessionId) {
    
    // console.log(idChapitre, idSession)

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
                      type='danger' 
                      onClick={() => {
                          Meteor.call('chapitres.remove', chapitreId)
                      }}>
                  supprimer
              </Button>

          ]
      } else {
          return [

              <Button 
                      type='primary'
                      onClick={() => { 
                          this.props.history.push(`/session/${sessionId}/chapitre/${chapitreId}`)
                      }}>
                  rejoindre
              </Button>
          ]
      }
  }

  render() {

    // console.log(this.props.history)

    if (this.props.loading) {
      return (
        <h3>Chargement en cours</h3>
      )
    }
    if (this.props.chapitresExists) {

      return (

        <List
          header={<div>liste des chapitres</div>} 
          bordered
          dataSource={this.props.chapitres}
          renderItem={item => (
            <List.Item
              actions={this.renderActionsChapitres(item._id, item.session)}
            >
              {item.titre}

            </List.Item>

          )}
        />
      
        // <div className="index-chapitres">
        //   <h2>Liste des chapitres</h2>
        //     {this.props.chapitres.map((chapitre) => (
        //       <li key={chapitre._id}>
        //         <Link to={`/session/${this.props.sessionId}/chapitre/${chapitre._id}`}>{chapitre.titre}</Link>
        //         {!!this.props.connecte 
        //           && this.props.role === "editeur" ? 
        //           <button onClick={() => {
        //             Meteor.call('chapitres.remove', chapitre._id)
        //               // envoie des notifications

        //             let infos = {
        //               title : "message de l'éditeur",
        //               message : `suppresion du chapitre : ${chapitre.titre}`,
        //               type : "danger"
        //             }

        //             Meteor.call('notification', infos);
        //           }
        //           }>Supprimer le chapitre</button> 
        //           : undefined}
        //       </li>
        //     ))}
        //   </div>

      )
    }

    return (
      <h3>Cette session ne contient pas encore de chapitre</h3>
    )
  }
}

export default IndexChapitresContainer = withTracker((props) => {
  const chapitresHandle = Meteor.subscribe('chapitres');
  const loading = !chapitresHandle.ready();
  const chapitres = Chapitres.find({ session: props.sessionId }).fetch()
  const chapitresExists = !loading && !!chapitres;
  return {
    loading,
    chapitresExists,
    chapitres: chapitresExists ? chapitres : []
  }
})(IndexChapitres);