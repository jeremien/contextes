import React from 'react';

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';
import { Commentaires } from '../../api/collections/commentaires';

import AjouterCommentaire from './AjouterCommentaire';
import Commentaire from './Commentaire';
import IndexChapitre from './IndexChapitre';
import IndexSeance from './IndexSeance';

class TestAPI extends React.Component {
    render() {
        return(
            <div>
            <AjouterCommentaire {...this.props}/>
                {this.props.children}
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


export default logProps(TestAPI)
  