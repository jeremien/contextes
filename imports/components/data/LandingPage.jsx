import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';
import { Publications } from '../../api/collections/publication';

import { List, Divider } from 'antd';


class LandingPage extends Component {
    
    constructor(props) {
        super(props);
    }

    dataFilterSessions() {
        return this.props.sessions.filter((item) => {
            return item.etat === 'edition';
        })
    }

    dataFilterChapitres() {

        const data = this.dataFilterSessions()

        const chaps = data.map((session) => {
            return this.props.chapitres.filter((item) => {
                return item.session === session._id
            })
        })

        const openChaps = chaps.map((chap) => {
            return chap.filter((item) => {
                return item.isOpen === true;
            })
        })

        const finalData = openChaps.reduce((acc, currValue) => {
            return acc.concat(currValue)
        }, [])

        return finalData;
    }

    render() {

        if (!this.props.loading) {

                return (
                    <div>
                        <h3>Transcription</h3>
                        <List
        
                            header={<div>Chapitres ouverts</div>}
                            bordered
                            dataSource={this.dataFilterChapitres()}
                            renderItem={(item, key) => {
                        
                                return (
                                    <List.Item>
                                        <Link to={`/session/${item.session}/chapitre/${item._id}`}>{item.titre}</Link>  
                                    </List.Item>
                                )
                            }}
                    
                        />

                        <Divider />
                        
                         <List
                            header={<div>Sessions en cours d'édition</div>}
                            bordered
                            dataSource={this.dataFilterSessions()}
                            renderItem={(item) => {
                                    // console.log(item)
                                    return (
                                        <List.Item>
                                            <Link to={`/sessions/${item._id}`}>{item.titre}</Link>
                                        </List.Item>
                                    )
                                }
                            }
                        />

                        
                        { this.props.role === 'editeur' && 

                            <div>
                                <Divider />
                                <h3>Publication</h3>
                        
                                <List 
                                    header={<div>Dernières publications</div>}
                                    bordered
                                    dataSource={this.props.publications}
                                    renderItem={(item) => {
                                        return (
                                            <List.Item>
                                                <Link to={`/publications/${item._id}`}>{item.titre}</Link>
                                            </List.Item>
                                        )
                                    }}
                                />
                            </div>
                        }  
                      
                    </div>
                )

        } else {

            return <div>chargement</div>
        }
        
        
    }
}

export default withTracker(() => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const chapitresHandle = Meteor.subscribe('chapitres', {session: '*'});
    const publicationsHandle = Meteor.subscribe('publications');
    const loading = !sessionsHandle.ready() && !chapitresHandle.ready() && !publicationsHandle.ready();
    const sessions = Sessions.find({}).fetch();
    const chapitres = Chapitres.find({}).fetch();
    const publications = Publications.find({}, {sort : { creation: -1}}).fetch();
    const sessionsExists = !loading && !!sessions;
    const chapitresExists = !loading && !!chapitres;
    const publicationsExists = !loading && !!publications;

    return {
        loading,
        sessionsExists,
        chapitresExists,
        publicationsExists,
        sessions: sessionsExists ? sessions : [{}],
        chapitres: chapitresExists ? chapitres : [{}],
        publications: publicationsExists ? publications : [{}]
    }
})(LandingPage);