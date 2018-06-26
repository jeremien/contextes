import React, { Component } from 'react';
import { Commentaires } from '../../api/collections/commentaires.js';
import { withTracker } from 'meteor/react-meteor-data';

class Commentaire extends Component {  
    render() {
        return (<div className="commentaire">
            {this.props.commentaires.map((commentaire) => (
              <div className="commentaire" key={commentaire._id}>
              <li>À {commentaire.ecritA.toLocaleTimeString()} par {commentaire.auteur} : </li>
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