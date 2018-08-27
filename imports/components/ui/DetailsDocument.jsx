import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
/**
 * Affiche les détails et méta-data liées au docuement passé en props
 */
export default class DetailsDocument extends Component {
  static propTypes = {
    document: PropTypes.object.isRequired,
  };

  static defaultProps = {
    document: {},
  };

  render() {
    
    // console.log(this.props)

    return (
      <ul className="details-document">
        <li>Créé à {this.props.document.creation.toLocaleTimeString()} par {this.props.document.auteur}, corrigé à ? par ? : </li>
        <p>{this.props.document.contenu}</p>
        <br />
        <button onClick={() => Meteor.call('documents.remove', this.props.document._id)}>Supprimer le document</button>
        <button onClick={() => Meteor.call('documents.update', this.props.document._id, "doc revisé 2", "perceval")}>Modifier le document</button>
      </ul>);
  }
}