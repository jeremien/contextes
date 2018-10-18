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
        //   console.log(role, nombre)
          return { role, nombre };
        })
        // console.log(data)
        return data;
    }

    handleEtat(event) {
        Meteor.call('sessions.etat.update', this.props.session._id, event.target.value)
    }

    render() {

        // const data = [ { role : 'transcripteurs', nombre : 1 } , { role : 'correcteurs', nombre : 1 }];

        // console.log(this.state.etat)
        // console.log(this.props.session.roles)

        // this.renderRoles();
       
        // console.log(data)

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

                        <List
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
                        </List>

                    </Col>

                    <Divider />

                    <AjouterChapitre sessionId={this.props.session._id} />

                </Row>

                // <div className="infos--session">
                //     <div className="mui--text-title">tableau de bord pour : {this.props.session.titre}</div>
                    
                //     {/* <InfosSessions session={this.props.session} /> */}

                //     <div className="mui--text-subhead">Etat de la session</div>
                //     {/* <fieldset onChange={(event) => { console.log(event.target.value) }}> */}
                //     <fieldset onChange={this.handleEtat.bind(this)}>
                //         <div>
                //             <input type="radio" defaultChecked={this.state.etat == "edition" ? "checked" : ""} value="edition" name="etat" />
                //             <label>éditer</label>
                //         </div>

                //         <div>
                //             <input type="radio" defaultChecked={this.state.etat == "completee" ? "checked" : ""} value="completee" name="etat" />
                //             <label>compléter</label>
                //         </div>

                //         <div>
                //             <input type="radio" defaultChecked={this.state.etat == "archivee" ? "checked" : ""} value="archivee" name="etat" />
                //             <label>archiver</label>
                //         </div>

                //     </fieldset>
                //     <h3>Rôles autorisés :</h3>
                //     <ul>
                //         {Object.entries(this.props.session.roles).map(([role, nombre]) => (
                //             <li key={role}>{role} : {nombre}</li>
                //         ))}
                //     </ul>
                //     <AjouterChapitre sessionId={this.props.session._id} />
                // </div>
            )
        }
    }
}

export default TableauDeBordContainer = withTracker((props) => {
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !chapitresHandle.ready()
    const chapitres = Chapitres.find({ session: props.session._id }).fetch();
    const chapitresExists = !loading && !!chapitres;
    return {
        loading,
        chapitresExists,
        chapitres: chapitresExists ? chapitres : [],
    }
})(TableauDeBord);