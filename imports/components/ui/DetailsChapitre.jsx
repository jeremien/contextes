import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ConnexionsCourantes from '../outils/ConnexionsCourantes';
import Chatbox from "./Chatbox";
import Login from './Login';
import DetailsDocumentsContainer from '../data/DetailsDocumentsContainer';

import { Layout, Row, Col, Drawer, Switch, Button, Divider, Modal } from 'antd';


export default class DetailsChapitre extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleInfo: false,
            visibleChat: false,
            visibleLogin : false,
            test: 0,
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

        console.log(this.props)

        if (this.props.loading) {
            
            return (
                <div >
                    <h3>Chargement en cours</h3>
                </div>
            )

        } else {


            if (!!this.props.connecte && this.props.chapitreExists) {

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

            } else {

                return (
                    
                    <div>
                        <h3>{`Chapitre ${this.props.chapitre.titre} en cours de transcription`}</h3>
                        <DetailsDocumentsContainer {...this.props.chapitre} />
                    </div>         
                
                    )
    

                // return (
                //     <Modal
                //         title='Login'
                //         visible={this.state.visibleLogin}
                //         // onOk={() => {
                //         //     this.setState({
                //         //         visibleLogin: false
                //         //     })
                //         // }}
                //         onCancel={() => {
                //             this.setState({
                //                 visibleLogin: false
                //             })
                //         }}
                //     >
                //         <Login chapitre={this.props.chapitre._id} role={this.props.session.role || {}} />
                //     </Modal>
                // )

            }

        }


    }
}