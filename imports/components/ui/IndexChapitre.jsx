import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Moment from 'react-moment';

import { renderBadges } from '../utils/badges';
export default class IndexChapitres extends Component {

  handleChapitreDelete(chapitreId) {
    Meteor.call('chapitres.remove', chapitreId);
  }

  renderChapitres() {

    let { role } = this.props;

    return this.props.chapitres.map((item, key) => {

      let badges = renderBadges(this.props.badges, item._id);

      return (
        <div className='x jc bb py' key={key}>
                
                <p> N°{key + 1} </p>
                <p className='cff'><Moment format='DD/MM/YYYY'>{item.creation}</Moment></p>
                <p>{item.titre}</p>
                <p className='cff'>{item.isOpen ? 'ouvert' : 'fermé'}</p>
                <p> { badges ? badges : '0' } <span className='cff'>documents</span></p>
                <p className='lk crs' onClick={() => this.props.history.push(`/session/${item.session}/chapitre/${item._id}`) }>rejoindre</p>
                { role === 'editeur' ? <p className='lk crs' onClick={() => this.handleChapitreDelete(item._id)}>supprimer</p> : undefined }
        
        </div>
      )
    });

  }

  
  render() {

    return (
        <div>{this.renderChapitres()}</div>
        )
    
  }
}
