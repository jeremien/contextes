import React, { Component } from 'react';
import { Commentaires } from '../../api/collections/commentaires.js';
import { withTracker } from 'meteor/react-meteor-data';

/**
 * Affiche tous les commentaires liés à la session passées en props lors de l'appel du component.
 * props.seance : Id de la session passé en props par le component parent.
 */
class Commentaire extends Component { 
    render() {
        return (<div className="commentaire">
            {this.props.commentaires.map((commentaire) => (
              <div className="commentaire" key={commentaire._id}>
              <li>À {commentaire.creation.toLocaleTimeString()} par {commentaire.auteur} : </li>
              <p>{commentaire.contenu}</p>
              <br />
              </div>
            ))}
            </div>);
      }
}

export default withTracker((props) => {
  Meteor.subscribe('commentaires');
  return {
      commentaires: Commentaires.find({seance: props.seance}).fetch(),
    };
  })(Commentaire);