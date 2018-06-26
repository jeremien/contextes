import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';


import IndexSeance from './IndexSeance';
import Login from './Login';
import Inscriptiion from './Inscription';

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <ul>
            {!!this.props.connecte &&
            <div>
            <p>Connecté en tant que {Meteor.user().username}</p>
            <button className="logout" onClick={Meteor.logout}>Se déconnecter</button>
            </div>
            }
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/inscription">Inscription</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" name="home" component={IndexSeance}/>
          <Route path="/login" component={Login}/>
          <Route path="/inscription" component={Inscriptiion} />
        </div>
      </Router>
    )
  }
};

export default withTracker((props) => {
  
  return {
      connecte: !!Meteor.user(),
    };
  })(App);

