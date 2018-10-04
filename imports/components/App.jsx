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

import ReactNotification from "react-notifications-component";


import IndexSessions from './ui/IndexSessions';
import Login from './ui/Login';
import LandingPage from './ui/LandingPage';
import TestAPI from './ui/TestAPI';
import DetailsChapitreContainer from './data/DetailsChapitreContainer';
import TopBar from './ui/TopBar'

import IndexSessionsContainer from './data/IndexSessionsContainer';

/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLeavePage = this.handleLeavePage.bind(this);

    this.notificationDOMRef = React.createRef();

  }

  static defaultProps = {
    connecte: false,
    socket: {},
  }

  static propTypes = {
    connecte: PropTypes.bool.isRequired,
    connexion: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // Meteor.call('connexions.online', this.props.utilisateur)
    window.addEventListener("beforeunload", this.handleLeavePage);
    this.props.socket.on('logoutForce', this.logoutForce.bind(this));
    this.props.socket.on('onAir', () => console.log('on air'));
    this.props.socket.on('offAir', () => console.log('off air'));

    // notifications
    this.props.socket.on('notification', (title, message, type) => {
      console.log('notification', title, message, type)
        this.notificationDOMRef.current.addNotification({
            title,
            message,
            type,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 4000 },
            dismissable: { click: true }
        });
    });
       
  }

  componentWillUnmount() {
    // window.removeEventListener('beforeunload', this.handleLeavePage);
  }

  logoutForce() {
    console.log('logout')
    localStorage.clear();
    Session.clear()
    Meteor.call('connexions.remove', this.props.connexion._id);
  }

  handleLeavePage() {
    Meteor.call('connexions.offline', this.props.connexion._id)
  }



  render() {
    if (this.props.connecte) {
      Meteor.call('connexions.socket', this.props.connexion._id, this.props.socket.id)
    }
    // console.log(this.props.socket.id)
    const { role, utilisateur, ...rest } = this.props.connexion
    const propsToPass = { connecte: this.props.connecte, userId: this.props.connexion._id, role: role || "", utilisateur: utilisateur || "", socketId: this.props.socket.id }

    return (
      <Router>
        <div className="container">
          <ReactNotification ref={this.notificationDOMRef} />
          <div className="header">
            <Route path="/" render={(props) => <TopBar {...props} {...propsToPass} />} />
          </div>
          
          <div className="index">
            <Route path="/sessions" render={(props) => <IndexSessionsContainer {...props} {...propsToPass} />} />
            <Route path="/session/:idSession/chapitre/:idChapitre" render={(props) => <DetailsChapitreContainer {...props} {...propsToPass} />} />
          </div>
          
          <div className="landing">
            <Route exact path="/" render={(props) => <LandingPage {...props} {...propsToPass} />} />
          </div>  
          <div className="login">
            <Route path="/login" render={(props) => <Login {...props} {...propsToPass} />} /> 
          </div>
                    <Route path="/test" render={(props) => <TestAPI {...this.props} {...props} />} />
          <div className="footer">
            {/* <p>information</p> */}
          </div>
        </div>
      </Router>
    )
  }
};

export default withTracker((props) => {
  if (localStorage.getItem('userId') || Session.get('userId')) {
    const id = Session.get('userId') || localStorage.getItem('userId');
    if (!Session.get('userId')) { Session.set('userId', id) };
    const connexionsHandle = Meteor.subscribe('connexions');
    const loading = !connexionsHandle.ready()
    const connexion = Connexions.findOne(localStorage.getItem('userId'))
    const connexionExists = !loading && !!connexion
    if (!connexionExists) {
      return {
        loading: false,
        connecte: false,
        connexion: {},
      }
    }
    return {
      loading,
      connecte: connexionExists,
      connexion: connexionExists ? connexion : {},
    }
  }
  else {
    return {
      loading: false,
      connecte: false,
      connexion: {},
    }
  }


})(App);

