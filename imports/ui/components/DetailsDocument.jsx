import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <ul className="details-document">
        <li>À {this.props.document.creation.toLocaleTimeString()} par {this.props.document.auteur} : </li>
        <p>{this.props.document.contenu}</p>
        <br />
        <button onClick={() => Meteor.call('documents.remove', this.props.document._id)}>Supprimer le document</button>
      </ul>);
  }
}