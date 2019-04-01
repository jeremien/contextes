import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';

let manuel = `
Contextes est un espace partagé d'écriture, de lecture et d'aggrégation de documents.

Rôle
----
Chaque rôle (éditeur.rice, transcripteur.rice, correcteur.rice, iconographe, lecteur.rice) est accessible à tout moment 
et correspond à une action spécifique (ajout de texte, d'image, correction, trie) en lecture et écriture du jeu de documents.

[Sessions](http://contextes.io/sessions)
-------
Chaque session correspond à un événement : une session est, à sa création , en cours d'édition (l'éditeur.rice peut agir sur les sessions).
Lorsqu'une session est considérée comme terminée, elle est soit complétée, soit archivée. 

Chapitre
--------
Les chapitres appartiennent aux sessions, ils sont créés selon le découpage de l'événement (l'éditeur.rice peut agir sur les chapitres). 
Un chapitre est à sa création ouvert à la transcription. Lorsqu'un nouveau chapitre est créé, 
le chapitre précédent est fermé, il est éditable mais n'est plus transcriptible. 

Document
--------
Les documents ont plusieurs types (texte, image etc), ils sont créés par le ou la transcripteur.rice et l'iconographe
et peuvent être à tout moment corrigés, complétés, triés, validés ou rejetés par le ou la correcteur.rice et l'éditeur.rice.

Conversation
------------
Il est possible de discuter pendant l'événement sans que les échanges ne soient intégrés dans la transcription. 

Markdown
--------
Il est préconisé d'utiliser le balisage [markdown](https://www.markdownguide.org/basic-syntax/) pour ajouter des niveaux de lecture (titre, emphase, légende etc).

Dispositifs connexes
---------------------
[Plenty of room](http://plentyofroom.contextes.io) : écriture, lecture et dessin dans un espace à trois dimensions développé par Maxime Bouton et Émile Greis.

`;

class LandingPage extends Component {
    
    constructor(props) {
        super(props);
    }


    showEtat(etat) {
        
        switch(etat) {
            case 'edition':
                return "est en cours d'édition";
                break;
            case 'completee':
                return "est complétée";
                break;
            case 'archivee':
                return "est archivée";
                break;
            default:
                return undefined;
        }
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
                            <div className="landing--manuel">
                                <ReactMarkdown
                                    source={manuel}
                                />
                            </div>
                            <div className="landing--list">
                                <ul>
                                {
                                    this.props.sessions.map((item) => {
                                        // console.log(item.lastModified)
                                        return (
                                            <li className="landing--list--session" key={item._id}>
                                                <Link to={`/sessions/${item._id}`}> {item.titre} ({ <Moment format='DD/MM/YYYY'>{item.creation}</Moment> }) { this.showEtat(item.etat) }</Link>
                                                <ol className="landing--list--chapitre">
                                                    { this.dataFilterChapitres(item._id) }    
                                                </ol>
                                                
                                            </li>
                                        )
                                    })

                                }
                                </ul>
                            </div>
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