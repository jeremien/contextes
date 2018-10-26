import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import DetailsSession from './DetailsSession'

import { List, Button, Row, Col, Badge, Divider, Switch } from 'antd'

export default class IndexSessions extends Component {
    constructor(props) {
        super(props)
        this.getBadge = this.getBadge.bind(this)
    }
    state = {
        // toggleSession: false,
        toggleActionSession: false,
        badgeCourant: null,
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


    renderBadge(item) {

        // const getChapitres = Meteor.call('session.getAllChapitres', item._id)
        const badge = this.getBadge(item._id)
        console.log(badge)
        return (
            <Badge count={badge}>
                {item.titre} ({item.etat})
            </Badge>
        )

    }

    renderActionsSessions(id, etat) {

        // console.log(etat != 'edition')

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

                        Meteor.call('sessions.remove', id);

                        let infos = {
                            title: "message de l'éditeur",
                            message: `suppression de la session`,
                            type: "warning"
                        };

                        Meteor.call('notification', infos);
                    }}>
                    supprimer
                    </Button>

            ]
        } else {
            return [

                <Button
                    type='primary'
                    disabled={etat != 'edition'}
                    onClick={() => {

                        let infos = {
                            title: "message",
                            message: `${this.props.utilisateur} a rejoint la session`,
                            type: "success"
                        }

                        Meteor.call('notification', infos);

                        this.props.history.push(`/sessions/${id}`)
                    }}>
                    rejoindre
                    </Button>
            ]
        }

    }

    getBadge(session) {
        var nombre = 0

        this.props.badges.map((badge) => {
                if (badge._id == session) {
                    nombre = badge.sum
                }
        })

        return nombre
    }



    render() {
        const { match, path, ...rest } = this.props;
        return (

            <div className='index-session'>

                    {this.props.role === 'editeur' &&
                        <div>
                            <h4>Ajout d'une nouvelle session</h4>
                            <Switch
                                defaultChecked={this.state.toggleActionSession}
                                onChange={() => this.setState({ toggleActionSession: !this.state.toggleActionSession })}
                                style={{ marginBottom: '20px' }}
                            />
                        </div>
                    }

                    {this.state.toggleActionSession && this.props.role === 'editeur' ?

                        <div>
                            {this.props.action}
                            <Divider />
                        </div>

                        :

                        undefined}




                    <List
                        header={<div>listes des sessions</div>}
                        itemLayout='horizontal'
                        bordered
                        dataSource={this.props.sessions}
                        renderItem={item => {

                            return (<List.Item
                                actions={this.renderActionsSessions(item._id, item.etat)}
                            >
                                <Badge count={this.getBadge(item._id)} >
                                    {item.titre} ({item.etat})
                                </Badge>

                                {/* {this.getBadge(item._id)} */}

                            </List.Item>
                            )
                        }}
                    />

            </div>


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