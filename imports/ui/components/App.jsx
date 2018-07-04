import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute,
  Switch,
  withRouter,
} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


import IndexSession from './IndexSession';
import Login from './Login';
import Inscriptiion from './Inscription';
import MainLayout from '../layout/MainLayout';
import Chapitre from './Chapitre';
import AjouterSession from './AjouterSession';

/**
 * Composant principal de l'application. Gère les routes publiques.
 */
class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   connecte: !!sessionStorage.getItem("utilisateur") ? sessionStorage.getItem("utilisateur").connecte : false, 
    // }
    this.handleLogOut = this.handleLogOut.bind(this)
  }
  
  handleLogOut(history) {
    Session.set("connecte", false);
    history.push('/');
  }
  render() {
    return(
      <Router {...this.props}>
      <Switch>
        <MainLayout
          topbar={<div>
            <li><Link to="/">Home</Link></li>
            {!!this.props.connecte ?
              <div>
                  <p>Bienvenue, {Session.get('utilisateur')}. Vous êtes connecté en tant que {Session.get('role')}</p>
                  {/* <button className="logout" onClick={this.handleLogOut(this.props.history)}>Se déconnecter</button> */}
                  <LogOut/> 
              </div>
              :
              <div>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/inscription">Inscription</Link></li>
              </div>
            }
            </div>
          } >
          
          <Route exact path="/" name="home" component={IndexSession} />
          <Route excat path="/login" component={Login}/>
          <Route exact path="/inscription" component={Inscriptiion} />
          {/* <Route path="/chapitre/" component={Chapitre} /> */}
          {/* <Route path="/chapitre/:id" component={Chapitre}/> */}
          {/* Exemple d'une route avec un layout + components enfants
          <Route name="exemple" path="/exemple" component={Layout}>
            <IndexRoute components={{ enfant1: Component, enfant2: Component }} />
          </Route>
        */}
        </MainLayout>
        </Switch>
      </Router>
    )
  }
};

const LogOut = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => {
      Session.set("connecte", false);
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
      connecte: !!Session.get('connecte')
    }
  })(App);

