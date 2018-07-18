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


import IndexSession from './IndexSession';
import Login from './Login';
import MainLayout from '../layout/MainLayout';
import FullSession from './FullSession';
import TestAPI from './TestAPI';
import Chapitre from './Chapitre';
import AjouterSession from './AjouterSession';

import TableauDeBord from './TableauDeBord';

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
        <Switch>
          <MainLayout topbar={<TopBar {...this.props}/>} >
            <Route exact path="/" render={props => (
              <IndexSession {...this.props} {...props} />
            )} />
            <Route path="/login" component={Login} />
            <Route path="/test/" render={(props) => (
              <TestAPI  {...props} />
            )} />
            <Route exact path="/session/creer" component={AjouterSession} />
            <Route path="/session/:id" component={FullSession} />
            <Route path="/session/:id/admin" component={TableauDeBord} />
            <Route path="/chapitre/:id" component={Chapitre} />
          </MainLayout>
        </Switch>
      </Router >
    )
  }
};

const TopBar = (props) => {
  return (
    <div>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/test">TEst</Link></li>
      {!!props.connecte ?
        <div>
          <p>Bienvenue, {Session.get('utilisateur')}. Vous êtes connecté en tant que {Session.get('role')}</p>
          <LogOut />
        </div>
        :
        <div>
          <li><Link to="/login">Login</Link></li>
        </div>
      }
    </div>
  )
}

const LogOut = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => {
      Session.set("connecte", false);
      Meteor.call('connexions.remove', Session.get('utilisateur'));
      history.push('/');
    }}
  >
    Se déconnecter
  </button>
))

/**
 * Higher-Order Component permettant de gérer l'état de l'identification. 
 * Nécessaire pour avoir une interface à dynamique.
 */

export default withTracker((props) => {
  return {
    connecte: !!Session.get('connecte'),
    role: Session.get('role'),
  }
})(App);

