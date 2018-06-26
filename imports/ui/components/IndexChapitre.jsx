import React, { Component } from 'react';
import { Chapitres } from '../../api/collections/chapitres.js';
import { withTracker } from 'meteor/react-meteor-data';

/**
 * Affiche tous les commentaires liés à la session passées en props lors de l'appel du component.
 * props.seance : Id de la session passé en props par le component parent.
 */
class IndexChapitres extends Component { 
    render() {
        return (<div className="chapitres">
            {this.props.chapitres.map((chapitre) => (
              <div className="chapire" key={commentaire._id}>
              <li>À {chapitre.creation.toLocaleTimeString()} par {commentaire.auteur} : </li>
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
      chapitres : Chapitres.find({seance: props.seance}).fetch(),
    };
  })(IndexChapitres);