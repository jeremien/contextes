import React from 'react';
import {withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';
import { Commentaires } from '../../api/collections/commentaires';

import AjouterCommentaire from './AjouterCommentaire';
import Commentaire from './Commentaire';
import IndexChapitre from './IndexChapitre';

class TestAPI extends React.Component {
    render() {
        console.log(Meteor.call('session.getAllChapitres', this.props.match.params.param))
        return(
            <div>
                <h1>TestAPI</h1>
            </div>            
        )
    }
}

function logProps(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                connecte: false,
                role: "",
            };
        }

      render() {
        return (
            <WrappedComponent {...this.state}>
            <p>HOC ok</p>
            </WrappedComponent>
        );
      }
    }
  }


  export default withTracker((props) => {
    Meteor.subscribe('sessions');
    return({
        sessions : Sessions.find().fetch(),
    })
  })(TestAPI);
  