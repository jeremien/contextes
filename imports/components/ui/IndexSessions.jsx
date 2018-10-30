import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';

import { List, Button, Badge, Divider, Switch, Popconfirm, message } from 'antd'

export default class IndexSessions extends Component {
    constructor(props) {
        super(props)
        this.getBadge = this.getBadge.bind(this)
    }
    state = {
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

    handleSessionDelete(sessionId) {

        Meteor.call('sessions.remove', sessionId);

        let session = this.props.sessions.find((item) => {
            return item._id === sessionId;
          });

        let infos = {
            title: "message de l'éditeur",
            message: `suppression de la session : ${session.titre}`,
            type: "warning"
        };

        Meteor.call('notification', infos);
    }

    renderActionsSessions(sessionId, etat) {

        if (!!this.props.connecte
            && this.props.role === "editeur") {

            return [

                <Button
                    onClick={() => {
                        this.props.history.push(`/sessions/${sessionId}`)
                    }}>
                    voir
                </Button>,
                <Popconfirm
                    title='Voulez-vous supprimer la session ?'
                    onConfirm={() => this.handleSessionDelete(sessionId)}
                    onCancel={() => message.error('annulation')}
                    okText='oui'
                    cancelText='non'
                >
                    <Button type='danger'> supprimer </Button>
                
                </Popconfirm>
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
                        Meteor.call('log.insert', 'notification', infos.message );

                        this.props.history.push(`/sessions/${sessionId}`)
                    }}>
                    rejoindre
                    </Button>
            ]
        }

    }

    renderBadge(item) {
        const badge = this.getBadge(item._id)
        console.log(badge)
        return (
            <Badge count={badge}>
                {item.titre} ({item.etat})
            </Badge>
        )

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

                        : undefined 
                    }


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

                            </List.Item>
                            )
                        }}
                    />
            </div>
        )
    }
};