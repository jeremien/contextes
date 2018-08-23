import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class TopBar extends Component {
  render() {
    return (
      <nav className="topbar-container" >
        <ul >
        <li className="topbar--titre"> <Link to="/sessions"> Index des Sessions </Link> </li>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/test">Test</Link> */}
        
        {!!this.props.connecte ?

          <li className="topbar--login">
            
            Bienvenue, {this.props.utilisateur}. Vous êtes connecté en tant que {this.props.role}
            
            <LogOut {...this.props} />
          </li>
          :
          <li className="topbar--logout">
            <Link to="/login">Login</Link>
          </li>
        }
        </ul>
      </nav>
    )
  }
}

const LogOut = (props) => {
  return (
    <button
      type='button'
      onClick={() => {
        localStorage.clear();
        Session.clear()
        Meteor.call('connexions.remove', props.userId);
        if (props.role == 'editeur') {
          Meteor.call('deconnexion.editeur')
        }
        props.history.push('/');
      }}
    >
      Se déconnecter
      </button>
  )
}
