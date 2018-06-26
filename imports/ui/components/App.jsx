import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute
} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';


import IndexSeance from './IndexSeance';
import Login from './Login';
import Inscriptiion from './Inscription';
import MainLayout from '../layout/MainLayout';
import Commentaire from './Commentaire';

/**
 * Composant principal de l'application. Gère les route publiques.
 */
class App extends Component {
  handleLogOut() {
    Meteor.logout();
  }
  render() {
    if (!sessionStorage.getItem("connecte")){
      sessionStorage.setItem("connecte", false);
    }
    return(
      <Router {...this.props}>
        <MainLayout
          topbar={<div>
            {!!this.props.connecte ?
              <div>
                  <p>Connecté en tant que {Meteor.subscribe().username}</p>
                  <button className="logout" onClick={this.handleLogOut.bind(this)}>Se déconnecter</button>
              </div>
              :
              <div>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/inscription">Inscription</Link></li>
              </div>
            }
            </div>
          }>
          <Route exact path="/" name="home" component={IndexSeance} {...this.props}/>
          <Route path="/login" component={Login}/>
          <Route path="/inscription" component={Inscriptiion} />
        </MainLayout>
      </Router>
    )
  }
};

/**
 * Higher-Order Component permettant de gérer l'état de l'identification. 
 * Nécessaire pour avoir une interface à dynamique.
 */
export default withTracker((props) => {

  return {
      connecte: !!Meteor.user(),
    };
  })(App);

