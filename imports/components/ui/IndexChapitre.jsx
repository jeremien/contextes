import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

import { Chapitres } from '../../api/collections/chapitres';

class IndexChapitres extends Component {

  render() {
    if (this.props.loading) {
      return (
        <h3>Chargement en cours</h3>
      )
    }
    if (this.props.chapitresExists) {
      return (
        <div className="index-chapitres">
        <h2>Liste des chapitres</h2>
          {this.props.chapitres.map((chapitre) => (
            <li key={chapitre._id}>
              <Link to={`/session/${this.props.sessionId}/chapitre/${chapitre._id}`}>{chapitre.titre}</Link>
              {!!this.props.connecte 
                && this.props.role === "editeur" ? 
                <button onClick={() => {
                  Meteor.call('chapitres.remove', chapitre._id)
                    // envoie des notifications

                  let infos = {
                    title : "message de l'éditeur",
                    message : `suppresion du chapitre : ${chapitre.titre}`,
                    type : "danger"
                  }

                  Meteor.call('notification', infos);
                }
                }>Supprimer le chapitre</button> 
                : undefined}
            </li>
          ))}
        </div>
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