import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
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
import TestAPI from './ui/TestAPI';
import DetailsSession from './ui/DetailsSession';

import IndexSessionsContainer from './data/IndexSessionsContainer';
import IndexPublicationsContainer from './data/IndexPublicationsContainer';
import DetailsPublicationsContainer from './data/DetailsPublicationsContainer';
import IndexLogsContainer from './data/IndexLogsContainer';
import TopBarContainer from './data/TopBarContainer';
import DetailsChapitreContainer from './data/DetailsChapitreContainer';
import LandingPage from './data/LandingPage';



import { Layout, notification } from 'antd';

import "antd/dist/antd.css";
// import ConnexionSession from './VersionWeb/ConnexionSession';
import LoginWeb from './VersionWeb/LoginWeb';

const { Header, Content } = Layout;



/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onAir: false
    }

    this.handleLeavePage = this.handleLeavePage.bind(this);
    this.openNotification = this.openNotification.bind(this);

  }

  static defaultProps = {
    connecte: false,
  }


  componentDidMount() {
    window.addEventListener("beforeunload", this.handleLeavePage);
    Streamy.on('logoutForce', this.logoutForce.bind(this));
    Streamy.on('onAir', () => this.setState({ onAir: true }));
    Streamy.on('offAir', () => this.setState({ onAir: false }));

    // notifications

    Streamy.on('notification', (infos) => {
      const { title, message, type } = infos;
      this.openNotification(title, message, type);
    });
  }

  openNotification(title, message, type) {

    notification.config({
      placement: "bottomLeft"
    }),

      notification[type]({
        message: title,
        description: message
      })

  }

  componentWillUnmount() {
    // window.removeEventListener('beforeunload', this.handleLeavePage);
  }

  logoutForce() {
    localStorage.clear();
    Session.clear()
    Meteor.call('connexions.remove', this.props.connexion._id);
  }

  handleLeavePage() {
    Meteor.call('connexions.offline', this.props.connexion._id)
  }


  render() {
    var propsToPass;
    if (this.props.connecte && !this.props.loading) {
      Meteor.call('connexions.socket', this.props.connexion._id, Streamy.id())
      // const ConnexionContext = React.createContext(this.props.connexion);
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



    return (
      <Router>

        <Layout>

          <Header style={{ backgroundColor: 'white', position: 'fixed', zIndex: 1, width: '100%' }}>

            <Route path="/" render={(props) => <TopBarContainer {...props} {...propsToPass} />} />
          </Header>

          <Content style={{ padding: '20px 50px', margin: '100px 0 0 0 ' }}>


            <Route exact path="/sessions" render={(props) => <IndexSessionsContainer {...props} {...propsToPass} />} />
            <Route exact path="/session/:idSession/chapitre/:idChapitre" render={(props) => <DetailsChapitreContainer {...props} {...propsToPass} draft={false} />} />
            <Route path="/session/:idSession/chapitre/:idChapitre/draft" render={(props) => <DetailsChapitreContainer {...props} {...propsToPass} draft={true} />} />

            <Route path="/publications" render={(props) => <IndexPublicationsContainer {...props} {...propsToPass} />} />
            <Route exact path="/publication/:idPublication" render={(props) => <DetailsPublicationsContainer {...props} {...propsToPass} layout={false} />} />
            <Route path="/publication/:idPublication/layout" render={(props) => <DetailsPublicationsContainer {...props} {...propsToPass} layout={true} />} />


            <Route path="/logs" render={(props) => <IndexLogsContainer {...props} {...propsToPass} />} />

            <Route exact path="/" render={(props) => <LandingPage {...props} {...propsToPass} />} />


            {/**
            * Route pour la version Web
            */}
            {/* <Route path="/login" render={(props) => <Login {...props} {...propsToPass} />} /> */}
            <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...propsToPass} />} />

            {/**
            * Route pour la versino serveur local
            */}
            <Route path="/login" render={(props) => <LoginWeb {...props} {...propsToPass} />} />
            {/* <Route path="/sessions/:sessionId" render={(props) => <ConnexionSession {...props} {...propsToPass} />} /> */}




            <Route path="/test" render={(props) => <TestAPI {...this.props} {...propsToPass} />} />

          </Content>
        </Layout>

      </Router >
    )
  }
};
/**
 * Tracker pour la version serveur local
 */

// export default withTracker((props) => {
//   if (localStorage.getItem('userId') || Session.get('userId')) {
//     const id = Session.get('userId') || localStorage.getItem('userId');
//     if (!Session.get('userId')) { Session.set('userId', id) };
//     const connexionsHandle = Meteor.subscribe('connexions');
//     const loading = !connexionsHandle.ready()
//     const connexion = Connexions.findOne(localStorage.getItem('userId'))
//     const connexionExists = !loading && !!connexion
//     if (!connexionExists) {
//       if (!loading) {
//         Session.clear();
//         localStorage.clear();
//       }
//       return {
//         loading: false,
//         connecte: false,
//         connexion: {},
//       }
//     }
//     else {
//       return {
//         loading,
//         connecte: connexionExists,
//         connexion: connexionExists ? connexion : {},
//       }
//     }
//   }


//   else {
//     return {
//       loading: false,
//       connecte: false,
//       connexion: {},
//     }
//   }

// })(Application);

/**
 * Tacker pour la version web
 */
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
