import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown/with-html';

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';

let manuel = `
Session

Chaque session correspond à un évenement : une session est à sa création en cours d'édition.
Lorsqu'une session est considérée comme terminée, elle est soit complétée, soit archivée. 

Chapitre

Les chapitres appartiennent aux sessions, ils sont créés selon le découpage de l'évenement. 
Un chapitre est à sa création ouvert à la transcription. Lorsqu'un nouveau chapitre est créé, 
le chapitre précédent peut être fermé. 

Document

Les documents ont plusieurs types (texte, image etc), ils peuvent à tout moment, être corrigés, completés, triés, validés ou rejetés par le groupe. 

Rôle

Chaque rôle (éditeur.rice, transcripteur.rice, correcteur.rice, iconographe, lecteur.rice) est accessible à tout moment 
et correspond à une action spécifique en lecture et écriture du jeu de documents.

Conversation

Il est possible d'échanger pendant l'évenement sans que les échanges soient intégrés dans la transcription 

`;

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
        const data = this.dataFilterSessions();

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
        return <li key={item._id}><Link to={`/session/${sessionId}/chapitre/${item._id}`}>{item.titre} ({ <Moment format='DD/MM/YYYY'>{item.lastModified}</Moment> })</Link></li>
        });

    }

    render() {
        
        if (!this.props.loading) {

                return (<div className="landing--container">
                            <ReactMarkdown
                                source={manuel}
                                escapeHtml={true}
                            />
                            <ul className="landing--list">

                                {
                                    this.props.sessions.map((item) => {
                                        // console.log(item.lastModified)
                                        return (
                                            <li className="landing--list--session" key={item._id}>
                                                <Link to={`/sessions/${item._id}`}> {item.titre} ({ <Moment format='DD/MM/YYYY'>{item.creation}</Moment> } { item.etat })</Link>
                                                <ol className="landing--list--chapitre">
                                                    { this.dataFilterChapitres(item._id) }    
                                                </ol>
                                                
                                            </li>
                                        )
                                    })

                                }
                            </ul>
                        </div>)

        } else {

            return <div>chargement</div>
        }
        
        
    }
}

export default withTracker(() => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const chapitresHandle = Meteor.subscribe('chapitres', { session: '*' });
    const loading = !sessionsHandle.ready() && !chapitresHandle.ready();
    const sessions = Sessions.find({}, { sort: { lastModified : -1 }}).fetch();
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