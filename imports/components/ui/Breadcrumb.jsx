import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const renderBreadcrumb = (path) => {

    let regexSessions = RegExp('\/sessions\/(.*)','g');
    let regexChapitre = RegExp('\/session\/(.*)\/chapitre\/(.*)', 'g');

    let session = regexSessions.test(path);
    let chapitre = regexChapitre.test(path);

    if (path === '/') {
        return <span>accueil</span>;
    } else if (path === '/sessions') {
        return <span><Link to={'/'}>accueil</Link> / sessions</span>
    } else if (session) {
        return <span><Link to={'/'}>accueil</Link> / <Link to={"/sessions"}>sessions</Link> / session </span>;
    } else if (chapitre) {
        let currentSession = /\/session\/(.*)\/chapitre\/(.*)/g.exec(path);

        // let chapitre = Meteor.call('chapitres.getTitre', currentSession[2]);
        // console.log(chapitre)

        return ( 
            <span><Link to={'/'}>accueil</Link> / <Link to={"/sessions"}>sessions</Link> / <Link to={`/sessions/${currentSession[1]}`}>session</Link> / chapitre 
            </span>
        )   
    }
}



const Breadcrumb = (props) => {

    return (

        <section id="breadcrumb">
            <div className="breadcrumb--container bb bcb py px">
                {renderBreadcrumb(props.location.pathname)}
            </div>
        </section>

    ) 
}

export default Breadcrumb;