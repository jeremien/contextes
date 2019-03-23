import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Moment from 'react-moment';

import { renderBadges } from '../utils/badges';
export default class IndexChapitres extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modifier : false,
      id : '',
      titre : '',
      description : '',
      auteur : '',
      isOpen : null
    }

    this.handleChapitreDelete = this.handleChapitreDelete.bind(this);
    this.handleModifier = this.handleModifier.bind(this);
    this.submitModif = this.submitModif.bind(this);
  }

  handleChapitreDelete(chapitreId) {

    if (this.props.badges.length === 0) {
      Meteor.call('chapitres.remove', chapitreId);
    } else {
      alert('ce chapitre contient des documents');
    }

  }

  handleModifier(id) {
    // console.log(id, this.props)
    let chapitre = this.props.chapitres.filter((item) => {
      return item._id === id;
    });
    let { _id, titre, description, auteur, isOpen } = chapitre[0];

    this.setState({
      modifier : !this.state.modifier,
      id : _id,
      titre : titre,
      description : description,
      auteur : auteur,
      isOpen : isOpen
    });
  }

  submitModif(e) {
    e.preventDefault();
    let { titre, description, auteur, isOpen } = this.state;
    Meteor.call('chapitres.update', this.state.id, { titre, description, auteur, isOpen });
    this.setState({
        modifier : false
    });
  } 

  renderChapitres() {

    if (this.props.chapitres.length != 0) {

      let { role } = this.props;

      return this.props.chapitres.map((item, key) => {
  
        let badges = renderBadges(this.props.badges, item._id);
  
        return (
          <div className={item.isOpen ? 'x jc bb py' : 'x jc bb bcbb cfbl py'} key={key}>
                  
                  <p> N°{key + 1} </p>
                  <p className='cff'><Moment format='DD/MM/YYYY'>{item.creation}</Moment></p>
                  <p>{item.titre}</p>
                  <p>{item.auteur}</p>
                  <p className='cff'>{item.isOpen ? 'ouvert' : 'fermé'}</p>
                  <p> { badges ? badges : '0' } <span className='cff'>documents</span></p>
                  <button className="btt bcbb bg cfbl py" onClick={() => this.handleModifier(item._id)}>modifier</button>
                  <button className="btt bcg bg cfgr py" onClick={() => this.props.history.push(`/session/${item.session}/chapitre/${item._id}`) }>rejoindre</button>
                  { role === 'editeur' ? <button className="btt bcr bg fcr py" onClick={() => {
                    // if (window.confirm('supprimer ce chapitre ?'));
                    this.handleChapitreDelete(item._id);
                    }}>supprimer</button> : undefined }
          
          </div>
        )
      });

    } else {

      return <p>il n'y a pas de chapitres</p>

    }

  }

  
  render() {

    return (
        <div>
          <p>Index des chapitres</p>
          { this.state.modifier ? <form onSubmit={this.submitModif}>
                                                <input type="texte" value={this.state.titre} onChange={(e) => this.setState({ titre : e.target.value })}/>
                                                <input type="texte" value={this.state.description} onChange={(e) => this.setState({ description : e.target.value })}/>
                                                <input type="texte" value={this.state.auteur} onChange={(e) => this.setState({ auteur : e.target.value })}/>
                                                <label><input type="radio" value={this.state.isOpen} checked={this.state.isOpen} onChange={() => this.setState({ isOpen : !this.state.isOpen})}/> ouvert </label> 
                                                <label><input type="radio" value={!this.state.isOpen} checked={!this.state.isOpen} onChange={() => this.setState({ isOpen : !this.state.isOpen})}/> fermer </label> 
                                                <input type="submit" value="valider" />
                                            </form> 
                                            : undefined }
          {this.renderChapitres()}
        </div>
        )
    
  }
}
