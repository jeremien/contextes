import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { List, Button, Badge, Popconfirm, message } from 'antd';

export default class IndexChapitres extends Component {

  constructor(props) {
    super(props);
  }

  handleChapitreDelete(chapitreId) {
    Meteor.call('chapitres.remove', chapitreId);
  }

  renderChapitres() {

    let { role } = this.props;

    return this.props.chapitres.map((item, key) => {

      return (
        <div className='x jc bb py' key={key}>
                
                <p> N°{key + 1} </p>
                <p>{item.titre}</p>
                {/* <p>{item.description}</p> */}
                {/* <p>{item.auteur}</p> */}
                {/* <p>{item.creation.toString()}</p> */}
                <p>{item.etat}</p>
                <p>{item.isOpen ? 'ouvert' : 'fermé'}</p>
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
