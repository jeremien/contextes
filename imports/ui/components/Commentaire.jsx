import React, { Component } from 'react';
import { Commentaires } from '../../api/collections/commentaires.js';
import { withTracker } from 'meteor/react-meteor-data';

/**
 * Affiche tous les commentaires liés à la session passées en props lors de l'appel du component.
 * props.seance : Id de la session passé en props par le component parent.
 */
export default class Commentaire extends Component {
  render() {
    return (
      <ul className="commentaire">
        <li>À {this.props.commentaire.creation.toLocaleTimeString()} par {this.props.commentaire.auteur} : </li>
        <p>{this.props.commentaire.contenu}</p>
        <br />
      </ul>);
  }
}