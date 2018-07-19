import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute,
  Switch,
  withRouter,
  Prompt,
} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types'


import IndexSessions from './IndexSessions';
import Login from './Login';
import LandingPage from './LandingPage';
import TableauDeBord from './TableauDeBord';
import DetailsChapitre from './DetailsChapitre';

/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLeavePage = this.handleLeavePage.bind(this);
  }

  static defaultProps = {
    connecte: false,
    role: "",
  }

  static propTypes = {
    connecte: PropTypes.bool.isRequired,
    role: PropTypes.oneOf([
      '',
      'transcripteur',
      'correcteur',
      'conformateur',
      'editeur'
    ]).isRequired,
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.handleLeavePage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage);
  }

  handleLeavePage() {
    Meteor.call('connexions.remove', Session.get('utilisateur'))
  }

  render() {
    return (
      <Router>
        <div className="main">
          <div className="header">
            <h1>DDRcontexte</h1>
            <Route exact path="/" render={(props) => <TopBar {...props} {...this.props} />} />
          </div>
          <div className="index">
            <Route path="/sessions" render={(props) => <IndexSessions {...props} {...this.props} />} />
            <Route path="/session/:idSession/chapitre/:idChapitre" render={(props) => <DetailsChapitre {...props} {...this.props} />} />
          </div>
          <Route exact path="/" render={(props) => <LandingPage {...props} />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
        </div>
      </Router>
    )
  }
};

const TopBar = (props) => {
  return (
    <div className="topbar">
      <Link to="/">Home</Link>
      <Link to="/test">Test</Link>
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
        Session.set("connecte", false);
        Meteor.call('connexions.remove', props.utilisateur);
        props.history.push('/');
      }}
    >
      Se déconnecter
    </button>
  )
}

export default withTracker((props) => {
  return {
    connecte: !!Session.get('connecte'),
    utilisateur: Session.get('utilisateur'),
    role: Session.get('role'),
  }
})(App);

