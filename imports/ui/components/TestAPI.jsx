import React from 'react';
import {withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';

import AjouterCommentaire from './AjouterDocument';
import IndexChapitre from './IndexChapitre';

export default class TestAPI extends React.Component {
    render() {
        console.log(this.props.socket)
        return(
            <div>
                <h1>TestAPI</h1>
                <button onClick={() => Meteor.call('test.envoie', Streamy.id())}>Test message</button>
                <button onClick={() => Streamy.emit('test_serveur', {data: 'hello'})}>Test serveur</button>
            </div>            
        )
    }
}

// function logProps(WrappedComponent) {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//             this.state = {
//                 connecte: false,
//                 role: "",
//             };
//         }

//       render() {
//         return (
//             <WrappedComponent {...this.state}>
//             <p>HOC ok</p>
//             </WrappedComponent>
//         );
//       }
//     }
//   }


//   export default withTracker((props) => {
//     Meteor.subscribe('sessions');
//     return({
//         sessions : Sessions.find().fetch(),
//     })
//   })(TestAPI);
  