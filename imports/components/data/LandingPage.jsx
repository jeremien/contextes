import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';

import { List } from 'antd';


class LandingPage extends Component {
    
    constructor(props) {
        super(props);
    }

    dataFilter() {
        // console.log('test')

        const data = this.props.sessions.filter((item) => {
            return item.etat === 'edition';
        })

        const chaps = data.map((session) => {
            // console.log(session._id)
            return this.props.chapitres.filter((item) => {
                return item.session === session._id
            })
        })

        const finalData = chaps.reduce((acc, currValue) => {
            return acc.concat(currValue)
        }, [])

        console.log(finalData)

        return finalData;

    }

    render() {

        console.log(this.props)

        if (!this.props.loading) {

            if (!this.props.connecte) {

                return (
                    <List 
                        header={<div>Dernières publications</div>}
                        bordered
                    
                    />
                )

            } else {

                return (
                    <List
        
                        header={<div>Chapitres en cours d'édition</div>}
                        bordered
                        dataSource={this.dataFilter()}
                        renderItem={(item, key) => {
        
                            // let date = item.toLocaleTimeString();
        
                            return (
                                <List.Item>
                                   <Link to={`/session/${item.session}/chapitre/${item._id}`}>{item.titre}</Link>  
                                </List.Item>
                            )
                        }}
                    
                    
                    />
                )


            }

        } else {

            return <div>chargement</div>
        }
        
        
    }
}


export default withTracker(() => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const chapitresHandle = Meteor.subscribe('chapitres');
    const loading = !sessionsHandle.ready() && !chapitresHandle.ready();
    const sessions = Sessions.find({}).fetch();
    const chapitres = Chapitres.find({}).fetch();
    const sessionsExists = !loading && !!sessions;
    const chapitresExists = !loading && !!chapitres;

    return {
        loading,
        sessionsExists,
        chapitresExists,
        sessions: sessionsExists ? sessions : [{}],
        chapitres: chapitresExists ? chapitres : []
    }
})(LandingPage);