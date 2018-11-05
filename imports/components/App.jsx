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
import TestAPI from './ui/TestAPI';
// import FilAriane from './ui/FilAriane';
import NoMatch from './ui/NoMatch';
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

import LayoutPDF from '../components/ui/LayoutPDF';

const { Header, Content } = Layout;



/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onAir : false
    }
    
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
    window.addEventListener("beforeunload", this.handleLeavePage);
    this.props.socket.on('logoutForce', this.logoutForce.bind(this));
    this.props.socket.on('onAir', () => this.setState({ onAir : true }));
    this.props.socket.on('offAir', () => this.setState({ onAir: false }));

    // notifications

    this.props.socket.on('notification', (title, message, type) => {
      this.openNotification(title, message, type);
    });
  }

  openNotification(title, message, type) {

      notification.config({
        placement : "bottomLeft"
      }),

      notification[type]({
        message : title,
        description : message
      })

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

    // console.log(this.props)
    
    if (this.props.connecte) {
      Meteor.call('connexions.socket', this.props.connexion._id, this.props.socket.id)
    }
    const { role, utilisateur, ...rest } = this.props.connexion
    const propsToPass = { 
      connecte: this.props.connecte, 
      userId: this.props.connexion._id, 
      role: role || "", 
      utilisateur: utilisateur || "", 
      socketId: this.props.socket.id, 
      socket : this.props.socket,
      loading: this.props.loading,
      onAir : this.state.onAir
    }

    return (
      <Router>

                <Layout >
                  
                  <Header style={{backgroundColor:'white', position: 'fixed', zIndex: 1, width: '100%' }}>

                    <Route path="/" render={(props) => <TopBarContainer {...props} {...propsToPass} />} />
                    
                  </Header>
                  
                  <Content style={{ padding: '20px 50px', margin: '100px 0 0 0 '}}>
                    
                    {/* <Route path="/" render={(props) => <FilAriane {...props} {...propsToPass} />} /> */}
                    
                    <Route exact path="/sessions" render={(props) => <IndexSessionsContainer {...props} {...propsToPass} />} />
                    <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...propsToPass} />} />

                    <Route path="/session/:idSession/chapitre/:idChapitre" render={(props) => <DetailsChapitreContainer {...props} {...propsToPass} />} />

                    {/* <Route exact path='/chapitres' render={(props) => <IndexChapitresContainer {...props} {...propsToPass} /> } /> */}

                  
                    <Route path="/publications" render={(props) => <IndexPublicationsContainer {...props} {...propsToPass} />} />
                    <Route exact path="/publication/:idPublication" render={(props) => <DetailsPublicationsContainer {...props} {...propsToPass} layout={false}/>} />
                    <Route path="/publication/:idPublication/layout" render={(props) => <DetailsPublicationsContainer {...props} {...propsToPass} layout={true} />} />


                    <Route path="/logs" render={(props) => <IndexLogsContainer {...props} {...propsToPass} />} />

                    <Route exact path="/" render={(props) => <LandingPage {...props} {...propsToPass} />} />
                    <Route path="/login" render={(props) => <Login {...props} {...propsToPass} />} /> 

                    {/* <Route path='**' render={() => <NoMatch />} /> */}

                    <Route path="/test" render={(props) => <LayoutPDF {...this.props} {...propsToPass} />} />
                  
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

