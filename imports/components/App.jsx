import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor'
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
import FilAriane from './ui/FilAriane';

import IndexSessionsContainer from './data/IndexSessionsContainer';

import { Layout, notification } from 'antd';

import "antd/dist/antd.css";

const { Header, Content } = Layout;


/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    
    this.handleLeavePage = this.handleLeavePage.bind(this);
    this.openNotification = this.openNotification.bind(this);

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
      // console.log('notification', title, message, type)

      this.openNotification(title, message, type);
       
    });
  }

  openNotification(title, message, type) {
    // console.log(title, message, type)

      notification[type]({
        message : title,
        description : message
      })

  }


    // this.props.socket.on('notification', (title, message, type) => {
    //   console.log('notification', title, message, type)
    //     this.notificationDOMRef.current.addNotification({
    //         title,
    //         message,
    //         type,
    //         insert: "top",
    //         container: "top-right",
    //         animationIn: ["animated", "fadeIn"],
    //         animationOut: ["animated", "fadeOut"],
    //         dismiss: { duration: 4000 },
    //         dismissable: { click: true }
    //     });
    // });
       
  // }

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
    const propsToPass = { connecte: this.props.connecte, userId: this.props.connexion._id, role: role || "", utilisateur: utilisateur || "", socketId: this.props.socket.id, loading: this.props.loading }

    return (
      <Router>

            {/* <ReactNotification ref={this.notificationDOMRef} /> */}
                <Layout>
                  
                  <Header>
                    <Route path="/" render={(props) => <TopBar {...props} {...propsToPass} />} />
                    
                  </Header>
                  
                  <Content style={{ padding: '0 50px'}}>
                    
                    <Route path="/" render={(props) => <FilAriane {...props} {...propsToPass} />} />
                    
                    <Route path="/sessions" render={(props) => <IndexSessionsContainer {...props} {...propsToPass} />} />
                    <Route path="/session/:idSession/chapitre/:idChapitre" render={(props) => <DetailsChapitreContainer {...props} {...propsToPass} />} />
                  
                    <Route exact path="/" render={(props) => <LandingPage {...props} {...propsToPass} />} />
                    <Route path="/login" render={(props) => <Login {...props} {...propsToPass} />} /> 
                    <Route path="/test" render={(props) => <TestAPI {...this.props} {...props} />} />
                  
                  </Content>  
                </Layout>
      
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


})(Application);

