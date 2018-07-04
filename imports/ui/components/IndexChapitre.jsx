import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Chapitres } from '../../api/collections/chapitres.js';
import { withTracker } from 'meteor/react-meteor-data';

import AjouterChapitre from './AjouterChapitre';
import Chapitre from './Chapitre';

/**
 * Affiche tous les commentaires liés à la session passées en props lors de l'appel du component.
 * props.seance : Id de la session passé en props par le component parent.
 */
class IndexChapitres extends Component { 
  // componentWillUnmount() {
  //   console.log("Will unmount activé  ")
  // }
  
  // componentWillUpdate() {
  //   console.log("Will update activé")
  // }

  // componentDidMount() {
  //   console.log("Did mount")
  //   console.log(this.props)
  // }

  // componentWillMount() {
  //   console.log("Will mount")
  // }

  // componentDidCatch() {
  //   console.log("Did catch")
  // }

  componentDidUpdate() {

  }
  
  render() {
        return (
        <div className="chapitres">
            <h2>Ajouter un chapitre</h2>
            {!!Session.get('connecte') && 
            <AjouterChapitre session={this.props.session} />
            }
            <br />
            {!!this.props.chapitres ?
            <div>
              <h2>Liste des chapitres existants</h2>
              {this.props.chapitres.map((chapitre) => (
                <li key={chapitre._id}>
                   
                  <Link to={`/chapitre/${chapitre._id}`}>{chapitre.titre}</Link>
                  
                </li>
              ))}
              </div>
              :
              <h3>Auncun chapitre pour l'instant</h3>
            }
            </div>
            
          );
      }
}

export default withTracker((props) => {
  Meteor.subscribe('chapitres');
  return {
      chapitres : Chapitres.find({session: props.session}).fetch(),
    };
  })(IndexChapitres);