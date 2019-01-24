import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link, Switch }from 'react-router-dom'

import { Chapitres } from '../../api/collections/chapitres'

import AjouterChapitre from '../outils/editeur/AjouterChapitre';

import InfosSessions from './InfosSession';

import { Row, Col, Checkbox, Radio, List, Divider } from 'antd';

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;



class TableauDeBord extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            etat: this.props.session.etat
        }

        this.handleEtat = this.handleEtat.bind(this);
    }
    
    renderRoles() {
        const data = Object.entries(this.props.session.roles).map(([role, nombre]) => {
          return { role, nombre };
        })
        return data;
    }

    handleEtat(event) {
        Meteor.call('sessions.etat.update', this.props.session._id, event.target.value)

        // let session = this.props.session.find((item) => {
        //     return item._id === this.props.session._id;
        //   });

        let infos = {
            title: `message de ${this.props.utilisateur}, l'éditeur`,
            message: `la session : ${this.props.session.titre} est ${event.target.value}`,
            type: "warning"
          }
      
        Meteor.call('notification', infos);
        Meteor.call('log.insert', 'notification', infos.message );
    }

    render() {

        console.log(this.props)

        if (this.props.loading) {

            return (
                <h3>Chargement en cours</h3>
            )
            
        }

        else {

            return (

                <Row gutter={16}>
                    
                    <Col span={12}>

                        <InfosSessions session={this.props.session} />

                    </Col>
                    
                    <Col span={12}>


                        <RadioGroup
                            size='small'
                            value={this.props.session.etat}
                            onChange={this.handleEtat}
                        >
                            <RadioButton value='edition'>Édition</RadioButton>
                            <RadioButton value='completee'>Complétée</RadioButton>
                            <RadioButton value='archivee'>Archivée</RadioButton>
                        
                        </RadioGroup>

                        {/* <List
                            style={{ margin: '10px' }}
                            size='small'
                            header={<div>Rôles</div>}
                            bordered
                            dataSource={this.renderRoles()}
                            renderItem={item => (
                                <List.Item>
                                    {item.role} : {item.nombre}
                                </List.Item>
                                )
                            }
                        >
                        </List> */}

                    </Col>

                    <Divider />

                    <AjouterChapitre sessionId={this.props.session._id} />

                </Row>

             
            )
        }
    }
}

export default TableauDeBordContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres', {session: props.session._id});
    const loading = !chapitresHandle.ready()
    const chapitres = Chapitres.find({ session: props.session._id }).fetch();
    const chapitresExists = !loading && !!chapitres;
    return {
        loading,
        chapitresExists,
        chapitres: chapitresExists ? chapitres : [],
    }
})(TableauDeBord);