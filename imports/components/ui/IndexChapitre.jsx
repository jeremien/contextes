import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Moment from 'react-moment';

import { renderBadges } from '../utils/badges';
export default class IndexChapitres extends Component {

  handleChapitreDelete(chapitreId) {

    if (this.props.badges.length === 0) {
      Meteor.call('chapitres.remove', chapitreId);
    } else {
      alert('ce chapitre contient des documents');
    }

    
  }

  renderChapitres() {

    if (this.props.chapitres.length != 0) {

      let { role } = this.props;

      return this.props.chapitres.map((item, key) => {
  
        let badges = renderBadges(this.props.badges, item._id);
  
        return (
          <div className='x jc bb py' key={key}>
                  
                  <p> N°{key + 1} </p>
                  <p className='cff'><Moment format='DD/MM/YYYY'>{item.creation}</Moment></p>
                  <p>{item.titre}</p>
                  <p>{item.auteur}</p>
                  <p className='cff'>{item.isOpen ? 'ouvert' : 'fermé'}</p>
                  <p> { badges ? badges : '0' } <span className='cff'>documents</span></p>
                  <p className='lk crs' onClick={() => this.props.history.push(`/session/${item.session}/chapitre/${item._id}`) }>rejoindre</p>
                  { role === 'editeur' ? <p className='lk crs' onClick={() => {
                    // if (window.confirm('supprimer ce chapitre ?'));
                    this.handleChapitreDelete(item._id);
                    }}>supprimer</p> : undefined }
          
          </div>
        )
      });

    } else {

      return <p>il n'y a pas de chapitres</p>

    }

  }

  
  render() {

    return (
        <div>{this.renderChapitres()}</div>
        )
    
  }
}
