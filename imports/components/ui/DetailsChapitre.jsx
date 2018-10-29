import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ConnexionsCourantes from '../outils/ConnexionsCourantes';
import Chatbox from "./Chatbox";

import { Layout, Row, Col, Drawer, Switch, Button, Divider } from 'antd';


export default class DetailsChapitre extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleInfo: false,
            visibleChat: false,
            test: 0,
        }
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
        if (this.props.loading) {
            return (
                <div >
                    <h3>Chargement en cours</h3>
                </div>
            )
        }


        if (this.props.chapitreExists) {

            //TODO : ajouter le titre de la session dans le detail du chapitre

            return (

                <Layout>
                    <h2>{this.props.chapitre.titre}</h2>
                    <div>
                        <Button
                            onClick={() => this.setState({ visibleInfo: true })}
                        >
                            informations
                                </Button>
                        <Button
                            onClick={() => this.setState({ visibleChat: true })}
                        >
                            discussion
                                </Button>

                        <Drawer
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

                            <Chatbox { ...this.props } />
                            

                        </Drawer>
                    </div>


                    <Divider />

                    {this.props.outils.outildroit}

                </Layout>

            )
        }
        else {
            return (
                <div className="details-chapitre">
                    <h3>Choisir un chapitre</h3>
                </div>
            )
        }
    }
}