import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Chapitres } from '../../api/collections/chapitres';
import { withTracker } from 'meteor/react-meteor-data';

import AjouterChapitre from './AjouterChapitre';

class IndexChapitres extends Component {

  render() {
    return (
      <div className="chapitres">
        {(!!Session.get('connecte') && Session.get('role') == "editeur") &&
          <AjouterChapitre session={this.props.session} />
        }
        <br />
        <div>
          <h2>Liste des chapitres existants</h2>
          {this.props.chapitres.map((chapitre) => (
            <li key={chapitre._id}>

              <Link to={`${this.props.match.url}/chapitre/${chapitre._id}`}>{chapitre.titre}</Link>
              <button onClick={() => Meteor.call('chapitres.remove', chapitre._id)}>Supprimer le chapitre</button>
            </li>
          ))}
        </div>
        :
              <h3>Auncun chapitre pour l'instant</h3>
      </div>

    );
  }
}

export default IndexChapitresContainer = withTracker((props) => {
  const chapitresHandle = Meteor.subscribe('chapitres');
  const loading = !chapitresHandle.ready();
  const chapitres = Chapitres.find({ session: props.session }).fetch()
  const chapitresExists = !loading && !!chapitres;
  return {
    loading,
    chapitresExists,
    chapitres: chapitresExists ? chapitres : []
  }
})(IndexChapitres);