import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'


import ConnexionsCourantes from '../outils/ConnexionsCourantes'

import { Layout, Row, Col, Drawer, Switch, Button, Divider } from 'antd'; 


export default class DetailsChapitre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleInfo : false,
            visibleChat : false
        }
    }

    componentWillUnmount() {
        Meteor.call('connexions.offline', this.props.userId);
    };

    //Méthode à changer avec willMount/update selon l'endroit où sera définie la route
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
                                    onClose={() => this.setState({ visibleInfo : false})}
                                    visible={this.state.visibleInfo}
                                >

                                {this.props.outils.outilgauche}

                                </Drawer> 

                                <Drawer
                                    title="Discussion"
                                    placement="right"
                                    closable={true}
                                    onClose={() => this.setState({ visibleChat : false})}
                                    visible={this.state.visibleChat}
                                >

                                    <ConnexionsCourantes {...this.props} />

                                </Drawer>   
                            </div>    
                     
                        
                        <Divider />

                        {this.props.outils.outildroit}
                    
                </Layout>

            )
        }

        return (
            <div className="details-chapitre">
                <h3>Choisir un chapitre</h3>
            </div>
        )
    }
}