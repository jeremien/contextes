import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';

class LandingPage extends Component {
    
    constructor(props) {
        super(props);
    }

    dataFilterSessions() {
        return this.props.sessions.filter((item) => {
            return item.etat === 'edition';
        })
    }

    dataFilterChapitres(sessionId) {
        const data = this.dataFilterSessions()
        const chaps = data.map((session) => {
            return this.props.chapitres.filter((item) => {
                return sessionId === session._id
            });
        });
        const openChaps = chaps.map((chap) => {
            return chap.filter((item) => {
                return item.isOpen === true;
            });
        });
        const finalData = openChaps.reduce((acc, currValue) => {
            return acc.concat(currValue)
        }, []);

        return finalData.map((item) => {
            return <li key={item._id}><Link to={`/session/${sessionId}/chapitre/${item._id}`}>{item.titre}</Link></li>
        });

    }

    render() {

        if (!this.props.loading) {

                return <ul className="landing--list">

                            {
                                this.props.sessions.map((item) => {
                                    return (
                                        <li key={item._id}>
                                            <Link to={`/sessions/${item._id}`}>{item.titre}</Link>
                                            <ol className="landing--list--chapitre">
                                                { this.dataFilterChapitres(item._id) }    
                                            </ol>
                                            
                                        </li>
                                    )
                                })

                            }
                        </ul>

        } else {

            return <div>chargement</div>
        }
        
        
    }
}

export default withTracker(() => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const chapitresHandle = Meteor.subscribe('chapitres', { session: '*' });
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
        chapitres: chapitresExists ? chapitres : [{}],
    }
})(LandingPage);