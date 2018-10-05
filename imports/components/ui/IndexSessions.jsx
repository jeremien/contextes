import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Row, Col, Input, Checkbox, Button } from 'muicss/react';

import DetailsSession from './DetailsSession'

export default class IndexSessions extends Component {
    state = {
        toggleSession: false,
    }

    static propTypes = {
        sessions: PropTypes.array.isRequired,
        connecte: PropTypes.bool.isRequired,
        role: PropTypes.string.isRequired,
        utilisateur: PropTypes.string.isRequired,
        socketId: PropTypes.string.isRequired,
    };

    static defaultProps = {
        sessions: [{}],
    };


    renderSesssions() {
        let sessionsFiltrees = this.props.sessions;
        // console.log(sessionsFiltrees)
        if (this.state.toggleSession) {
            sessionsFiltrees = sessionsFiltrees.filter((session) => { return (session.etat == "archivee") })
        }
        else {
            sessionsFiltrees = sessionsFiltrees.filter((session) => { return !(session.etat == "archivee") })
        }
        // console.log(sessionsFiltrees)
        return sessionsFiltrees.map((session, key) => (
            <div className="mui--text-subhead" key={key}>
                <Link to={`/sessions/${session._id}`} >
                    {session.titre} 
                </Link>

                ({session.etat})

                {!!this.props.connecte 
                 && this.props.role === "editeur" ? 
                 <Button color="danger" onClick={() => 
                    { 
                        Meteor.call('sessions.remove', session._id)
                          
                        // envoie des notifications

                        let infos = {
                            title : "message de l'éditeur",
                            message : `suppresion de la session : ${session.titre}`,
                            type : "danger"
                        }

                        Meteor.call('notification', infos);

                    }}>Supprimer la session</Button> 
                    : undefined}

                <br />
            </div>
        ))
    }

    handleChange(event) {
        // console.log(event.target)
        const prevState = this.state.toggleSession;
        this.setState({ toggleSession: event.target.checked })
    }
    render() {
        // console.log(this.props.role);
        //Conflit avec les props passées par la route sans déconstruction. Trouver une solution plus propre
        var { match, path, ...rest } = this.props
        return (
            <Row>
                <Col md="6">

                  

                    <div className="liste-sessions">
                        <div className="mui--text-title">Liste des sessions</div>
                        <legend className="hide-archivee">
                            <Checkbox
                                name="archive"
                                type="checkbox"
                                checked={this.state.toggleSession}
                                onChange={this.handleChange.bind(this)}
                                label="Afficher les sessions archivées"
                            />
                            {this.state.toggleSession}
                        </legend>
                        {/* <label className="hide-archivee">
                            <input
                                type="checkbox"
                                readOnly
                                checked={this.state.hideCompleted}
                                onClick={this.toggleHideCompleted.bind(this)}
                            /> */}
                        {this.renderSesssions()}
                    </div>
                </Col>

                <Col md="6">
                    <div className="action-session">
                        {this.props.action} 
                    </div>
                    <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...rest} />} />
                </Col>
            </Row>
        )
    }
};