import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import DetailsSession from './DetailsSession'

import { List, Button, Row, Col } from 'antd'

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


    renderSessions() {
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
            <div  key={key}>
                <Link to={`/sessions/${session._id}`} >
                    {session.titre} 
                </Link>

                ({session.etat})

                {/* {!!this.props.connecte 
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
                    : undefined} */}

                <br />
            </div>
        ))
    }


    handleChange(event) {
        // console.log(event.target)
        const prevState = this.state.toggleSession;
        this.setState({ toggleSession: event.target.checked })
    }


    renderActionsSessions(id) {

        if (!!this.props.connecte 
            && this.props.role === "editeur") {
                return [

                    <Button 
                            onClick={() => { 
                                this.props.history.push(`/sessions/${id}`)
                            }}>
                        voir
                        </Button>,
                        <Button 
                            type='danger' 
                            onClick={() => {
                                Meteor.call('sessions.remove', id)
                            }}>
                        supprimer
                    </Button>

                ]
            } else {
                return [

                    <Button
                        type='primary' 
                        onClick={() => { 
                            this.props.history.push(`/sessions/${id}`)
                        }}>
                        rejoindre
                    </Button>
                ]
            }

    }



    render() {
        // console.log(this.props.history)
        // console.log(this.props.role);
        //Conflit avec les props passées par la route sans déconstruction. Trouver une solution plus propre

        const { match, path, ...rest } = this.props;

        // const data = this.renderSessionsList();
        // const data = ['test', 'japanese']
        // console.log(data)    
        
        // console.log(this.props.sessions)

        return (
 
                    <Row gutter={16}>

                        <Col span={12} >

                            {this.props.action} 

                            <List 
                                header={<div>listes des sessions</div>}
                                itemLayout='horizontal'
                                bordered
                                dataSource={this.props.sessions}
                                renderItem={item => (

                                    <List.Item
                                        actions={this.renderActionsSessions(item._id)}
                                    >   
                                        {item.titre} ({item.etat})

                                    </List.Item>
                                
                                )}                    
                            />

                            
                        
                        </Col>

                         <Col span={12} >
                            <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...rest} />} />
                         </Col>
                   
                    </Row>

                    // <div className="liste-sessions">
                    //     <div >Liste des sessions</div>
                    //     <legend className="hide-archivee">
                    //         {/* <Checkbox
                    //             name="archive"
                    //             type="checkbox"
                    //             checked={this.state.toggleSession}
                    //             onChange={this.handleChange.bind(this)}
                    //             label="Afficher les sessions archivées"
                    //         /> */}
                    //         {/* {this.state.toggleSession} */}
                    //     </legend>
                    //     {/* <label className="hide-archivee">
                    //         <input
                    //             type="checkbox"
                    //             readOnly
                    //             checked={this.state.hideCompleted}
                    //             onClick={this.toggleHideCompleted.bind(this)}
                    //         /> */}
                    //     {this.renderSessions()}
                    // </div>



                    // <div className="action-session">
                    //     {this.props.action} 
                    // </div>
                    // <Route path="/sessions/:sessionId" render={(props) => <DetailsSession {...props} {...rest} />} />
                    
         
        )
    }
};