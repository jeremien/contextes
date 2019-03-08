import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Connexions } from '../api/collections/connexions'

import Login from './ui/Login';
import ConnexionSession from './ui/ConnexionSession';

import IndexSessionsContainer from './data/IndexSessionsContainer';

import TopBarContainer from './data/TopBarContainer';
import AlertMessage from './ui/AlertMessage';
import Breadcrumb from './ui/Breadcrumb';
import DetailsChapitreContainer from './data/DetailsChapitreContainer';
import LandingPage from './data/LandingPage';
import Reset from './data/Reset';


/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onAir: false,
      alert : null
    }

    this.handleLeavePage = this.handleLeavePage.bind(this);

  }

  static defaultProps = {
    connecte: false,
  }


  componentDidMount() {
    window.addEventListener("beforeunload", this.handleLeavePage);
    // Streamy.on('logoutForce', this.logoutForce.bind(this));
    Streamy.on('onAir', () => this.setState({ onAir: true }));
    Streamy.on('offAir', () => this.setState({ onAir: false }));


    Streamy.on('notification', (message) => {

      this.setState({
        alert : message
      });
    });
  }
 
  // logoutForce() {
  //   localStorage.clear();
  //   Session.clear()
  //   Meteor.call('connexions.remove', this.props.connexion._id);
  // }

  handleLeavePage() {
    Meteor.call('connexions.offline', this.props.connexion._id)
  }


  render() {
    var propsToPass;
    if (this.props.connecte && !this.props.loading) {
      Meteor.call('connexions.socket', this.props.connexion._id, Streamy.id())
    }
    const { role, username, session, ...rest } = this.props.connexion

    propsToPass = {
      connecte: this.props.connecte,
      userSession: session,
      userId: this.props.connexion._id,
      role: role || "",
      utilisateur: username || "",
      socketId: Streamy.id(),
      loading: this.props.loading,
      onAir: this.state.onAir
    }

    if(!Meteor.userId()){
      console.log('login')
    }


    return (
      <Router>

        <div className='root--container'>

            <Route path="/" render={(props) => <TopBarContainer {...props} {...propsToPass} />} />
            <Route path="/" render={() => <AlertMessage alert={this.state.alert} />} />
            <Route path="/" render={(props) => <Breadcrumb {...props} />} />

            <article >
              <Route exact path="/" render={(props) => Meteor.userId() ? <LandingPage {...props} {...propsToPass} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> } />

              <Route path="/login" render={(props) => <Login {...props} {...propsToPass} />} />
              
              <Route exact path="/sessions" render={(props) => <IndexSessionsContainer {...props} {...propsToPass} />} />
              <Route path="/sessions/:sessionId" render={(props) => <ConnexionSession {...props} {...propsToPass} />} />
              <Route exact path="/session/:idSession/chapitre/:idChapitre" render={(props) => <DetailsChapitreContainer {...props} {...propsToPass} />} />    

              <Route exact path="/reset" render={(props) => <Reset {...props} />} />

            </article>
           
            
        </div>

      </Router >
    )
  }
};

export default withTracker((props) => {
  const connexionsHandle = Meteor.subscribe('connexions');
  const loading = !connexionsHandle.ready()
  if (!!Meteor.user()) {
    const user = Meteor.user()
    const connexion = Connexions.findOne(Meteor.userId())
    return {
      loading: loading,
      connecte: !!Meteor.user(),
      connexion: connexion ? connexion : {}
    }
  }
  else {
    return {
      loading: false,
      connecte: false,
      connexion: {},
    }
  }
})(Application);

