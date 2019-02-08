import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ConnexionsCourantes from '../outils/ConnexionsCourantes';
// import Stream from './Stream'
import Chatbox from "./Chatbox";
import Login from './Login';
import DetailsDocumentsContainer from '../data/DetailsDocumentsContainer';
// import flvjs from 'flv.js'

import { Layout, Row, Col, Drawer, Switch, Button, Divider, Modal } from 'antd';


export default class DetailsChapitre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleInfo: false,
            visibleChat: false,
            visibleLogin: false,
            test: 0,
            edition: false,
            // toggleStream: true,
        }

        // this.showLoginModal = this.showLoginModal.bind(this);
    }

    componentWillUnmount() {
        Meteor.call('connexions.offline', this.props.userId);
    };

    // Méthode à changer avec willMount/update selon l'endroit où sera définie la route
    componentDidMount() {
        if (this.props.connecte && this.props.chapitreExists) {
            Meteor.call('connexions.chapitre', this.props.userId, this.props.chapitre.session, this.props.chapitre._id);
        }

    };


    render() {

        // console.log(this.props)

        if (this.props.loading) {

            return (
                <div >
                    <h3>Chargement en cours</h3>
                </div>
            )

        } else {


            if (!!this.props.connecte && this.props.chapitreExists) {

                //TODO : ajouter le titre de la session dans le detail du chapitre

                if (!this.props.draft) {

                    return (
                        <Layout>
                            <h2>{this.props.chapitre.titre}</h2>
                            <div>
                                {/* <Button.Group>
                                    <Button
                                        onClick={() => this.setState({ visibleInfo: true })}
                                    >
                                        Informations
                                            </Button>
                                    <Button
                                        onClick={() => this.setState({ visibleChat: true })}
                                    >
                                        Discussion
                                            </Button>

                                    <Button
                                        onClick={() => this.props.history.push(`/session/${this.props.chapitre.session}/chapitre/${this.props.chapitre._id}/draft`)}
                                    >
                                        Brouillon
                                    </Button>
                                </Button.Group> */}
                                {/* <Divider />
                                <Switch
                                    defaultChecked={this.state.toggleStream}
                                    onChange={() => { this.setState({ toggleStream: !this.state.toggleStream }) }}
                                    style={{ marginBottom: '20px' }}
                                />
                                {this.state.toggleStream &&
                                    <Stream chapitre={this.props.chapitre._id} />
                                } */}

                                {/* <Drawer
                                    title={`${this.props.chapitre.titre}`}
                                    placement="left"
                                    closable={true}
                                    onClose={() => this.setState({ visibleInfo: false })}
                                    visible={this.state.visibleInfo}
                                >

                                    {this.props.outils.outilgauche}

                                    <Divider />
                                    <ConnexionsCourantes {...this.props} />

                                </Drawer>

                                <Drawer
                                    title="Discussion"
                                    placement="right"
                                    closable={true}
                                    onClose={() => this.setState({ visibleChat: false })}
                                    visible={this.state.visibleChat}
                                >

                                    <Chatbox {...this.props} />


                                </Drawer> */}
                            </div>


                            {/* <Divider /> */}

                            {this.props.outils.outildroit}

                            {/* <Divider /> */}

                        </Layout>

                    )


                } else {

                    return (

                        <div>
                            <Button.Group>
                                <Button onClick={() => this.props.history.push(`/session/${this.props.chapitre.session}/chapitre/${this.props.chapitre._id}`)}>{`Retour au chapitre ${this.props.chapitre.titre}`}</Button>
                                {this.props.role === 'editeur' ? <Button onClick={() => this.setState({ edition: !this.state.edition })}>{this.state.edition ? 'Voir' : 'Editer'}</Button> : undefined}
                            </Button.Group>
                            <Divider />
                            <h3>{`Chapitre ${this.props.chapitre.titre} en cours de transcription`}</h3>
                            <Divider />
                            <DetailsDocumentsContainer {...this.props.chapitre} {...this.props} edition={this.state.edition} />
                        </div>

                    )

                }



            } else {

                return (

                    <div>
                        <h3>{`Chapitre ${this.props.chapitre.titre} en cours de transcription`}</h3>
                        <DetailsDocumentsContainer {...this.props.chapitre} />
                    </div>

                )

            }

        }


    }
}