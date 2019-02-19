import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Sessions } from '../../api/collections/sessions';
import IndexChapitreContainer from '../data/IndexChapitresContainer';
import TableauDeBord from './TableauDeBord';

class DetailsSession extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toggleActionChapitre : false
        }
    }

    

    componentDidMount() {
        if (this.props.connecte) {
            // TODO methode connexion.session ?
            // Meteor.call('connexions.session', this.props.utilisateur, this.props.sessionId); 
        }
    };

    componentWillUnmount() {
        // Meteor.call('sessions.deconnexion', this.props.utilisateur);
    }

    render() {
        if (!this.props.loading && this.props.sessionExists) {

            return (

                <section className='x xw fsc'>

                    {(!!this.props.connecte && this.props.role == "editeur") ?
                        
                        <div id='detailsession--form' className='br py px'>                         

                            <TableauDeBord session={this.props.session} /> 
                        
                        </div>    
                        :
                        undefined
                    }

                    <div id='detailsession--liste' className='py px'>
                        <IndexChapitreContainer 
                            {...this.props}
                            sessionId={this.props.session._id} 
                            role={this.props.role} 
                            connecte={this.props.connecte} 
                        />
                    </div>

                </section>
            )
        }
        else {
            return (
                <div >
                    <h2>Choisir une session à afficher</h2>
                </div>
            );
        }
    }
}

export default withTracker((props) => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !sessionsHandle.ready();
    const session = Sessions.findOne({ _id: props.match.params.sessionId })
    const sessionExists = !loading && !!session
    return {
        loading,
        sessionExists,
        session: sessionExists ? session : []
    }
})(DetailsSession);
