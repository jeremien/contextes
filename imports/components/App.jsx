import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute,
  Switch,
  withRouter,
  Prompt,
  Redirect
} from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Connexions } from '../api/collections/connexions'


import IndexSessions from './ui/IndexSessions';
import Login from './ui/Login';
import LandingPage from './ui/LandingPage';
import TestAPI from './ui/TestAPI';
import DetailsChapitreContainer from './data/DetailsChapitreContainer';

import '../stylesheets/main'
import IndexSessionsContainer from './data/IndexSessionsContainer';

/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLeavePage = this.handleLeavePage.bind(this);
    var logoutEditeur;
  }

  static defaultProps = {
    connecte: false,
    socket: {},
  }

  static propTypes = {
    connecte: PropTypes.bool.isRequired,
    // role: PropTypes.oneOf([
    //   '',
    //   'transcripteur',
    //   'correcteur',
    //   'conformateur',
    //   'editeur'
    // ]).isRequired,
    // utilisateur: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // Meteor.call('connexions.online', this.props.utilisateur)
    if (this.props.connexion.role == 'editeur') {
      this.logoutEditeur = function() {
        Meteor.call('deconnexion.editeur')
      }
    }
    window.addEventListener("beforeunload", this.handleLeavePage);
    this.props.socket.on('logoutForce', this.logoutForce.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage);
  }

  logoutForce() {
    console.log('logout')
    Meteor.call('connexions.remove', this.props.utilisateur);
    window.location.replace('/')
  }

  handleLeavePage() {
    Meteor.call('connexions.statut.offline', this.props.connexion._id)
  }

  

  render() {
    const {role, utilisateur, ...rest} = this.props.connexion
    const propsToPass = {connecte: this.props.connecte, role: role || "", utilisateur: utilisateur || "", socketId: this.props.socket.id}
    return (
      <Router>
        <div className="main">
          <div className="header">
            <Route path="/" render={(props) => <TopBar {...props} {...propsToPass} />} />
          </div>
          <hr />
          <div className="index">
            <Route path="/sessions" render={(props) => <IndexSessionsContainer {...props} {...propsToPass} />} />
            <Route path="/session/:idSession/chapitre/:idChapitre" render={(props) => <DetailsChapitreContainer {...props} {...propsToPass} />} />
          </div>
          <hr />
          <Route exact path="/" render={(props) => <LandingPage {...props} {...propsToPass} />} />
          <Route path="/login" render={(props) => <Login {...props} {...propsToPass} />} />
          <Route path="/test" render={(props) => <TestAPI {...props} {...propsToPass} />} />
        </div>
      </Router>
    )
  }
};

const TopBar = (props) => {
  return (
    <div className="topbar">
      <h1>DDRcontexte</h1>
      <Link to="/">Home</Link>
      <Link to="/test">Test</Link>
      <br />
      {!!props.connecte ?
        <div>
          <p>Bienvenue, {props.utilisateur}. Vous êtes connecté en tant que {props.role}</p>
          <LogOut {...props} />
        </div>
        :
        <div>
          <li><Link to="/login">Login</Link></li>
        </div>
      }
    </div>
  )
}

const LogOut = (props) => {
  return (
    <button
      type='button'
      onClick={() => {
        localStorage.clear();
        Session.clear()
        Meteor.call('connexions.remove', props.utilisateur);
        props.history.push('/');
      }}
    >
      Se déconnecter
    </button>
  )
}

export default withTracker((props) => {
  if (localStorage.getItem('userId') || Session.get('userId')) {
    const id = Session.get('userId') || localStorage.getItem('userId');
    if (!Session.get('userId')) {Session.set('userId', id)};
    const connexionsHandle = Meteor.subscribe('connexions');
    const loading = !connexionsHandle.ready()
    const connexion = Connexions.findOne(localStorage.getItem('userId'))
    const connexionExists = !loading && !!connexion
    if (!connexionExists) {
      return {
        loading: false,
        connecte: false,
        connexion: [],
      }
    }
    return {
      loading,
      connecte: connexionExists,
      connexion: connexionExists ? connexion: [],
    }
  }
  else {
    return {
      loading: false,
      connecte: false,
      connexion: [],
    }
  }


})(App);

