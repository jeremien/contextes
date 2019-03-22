import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';


let regexSessions = RegExp('\/sessions\/(.*)', 'g');
let regexChapitre = RegExp('\/session\/(.*)\/chapitre\/(.*)', 'g');

class Breadcrumb extends Component {

    constructor(props) {
        super(props);

        let { pathname } = this.props.location;

        this.state = {
            pathname: pathname,
            session: 'session',
            chapitre: 'chapitre'
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        // console.log(nextProps, prevState)

        if (nextProps.location.pathname !== prevState.pathname) {
            return { pathname: nextProps.location.pathname };
        }
        else return null;
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.location.pathname !== this.props.location.pathname) {

    //         let { pathname } = this.props.location;

    //         // console.log('update', pathname)

    //         let session = regexSessions.test(pathname);
    //         let chapitre = regexChapitre.test(pathname);

    //         if (session) {
    //             let currentSession = /\/sessions\/(.*)/g.exec(pathname);
    //             // console.log(currentSession)
    //         } else if (chapitre) {
    //             let currentChapitre = /\/session\/(.*)\/chapitre\/(.*)/g.exec(pathname);
    //             // let chapitre = Meteor.call('chapitres.getTitre', currentChapitre[2]);
    //             // console.log('chapitre', chapitre)
    //         }

    //     }
    // }
    /**
     * To Do:
     * Afficher nom chapitre & session
     * 
     * attention ! le code actuel fait bcp ramer (en dev ?)
     * */
    renderBreadcrumb() {

        let { pathname } = this.props.location;


        // let { pathname } = this.state;

        let regexSessions = RegExp('\/sessions\/(.*)', 'g');
        let regexChapitre = RegExp('\/session\/(.*)\/chapitre\/(.*)', 'g');

        let session = regexSessions.test(pathname);
        let chapitre = regexChapitre.test(pathname);



        if (pathname === '/') {

            return <span>accueil</span>;

        } else if (pathname === '/sessions') {

            return <span><Link to={'/'}>accueil</Link> / sessions</span>

        } else if (session) {

            // let currentSession = /\/sessions\/(.*)/g.exec(pathname);
            // Meteor.call('sessions.getTitre', currentSession[1], (error, result) => {
            //     if (error) {
            //         console.log(error)
            //     }
            //     else {
            //         this.setState({
            //             session: result
            //         })
            //     };
            // })
            return <span><Link to={'/'}>accueil</Link> / <Link to={"/sessions"}>sessions</Link> / {this.state.session} </span>;

        } else if (chapitre) {
            let currentSession = /\/session\/(.*)\/chapitre\/(.*)/g.exec(pathname);

            // let chapitre = Meteor.call('chapitres.getTitre', currentSession[2]);

            // Meteor.call('chapitres.getTitre', currentSession[2], (error, result) => {
            //     if (error) {
            //         console.log(error)
            //     }
            //     else {
            //         this.setState({
            //             chapitre: result
            //         })
            //     };
            // })

            if (chapitre) {
                // console.log(chapitre)
                return (
                    <span><Link to={'/'}>accueil</Link> / <Link to={"/sessions"}>sessions</Link> / <Link to={`/sessions/${currentSession[1]}`}>{this.state.session}</Link> / {this.state.chapitre}
                    </span>
                )
            } else {
                // console.log('chapitre')
                return (
                    <span><Link to={'/'}>accueil</Link> / <Link to={"/sessions"}>sessions</Link> / <Link to={`/sessions/${currentSession[1]}`}>{this.state.session}</Link> / {this.state.chapitre}
                    </span>
                )
            }
        }
    }



    render() {
        return (

            <section id="breadcrumb">
                <div className="breadcrumb--container bb bcb py px">
                    {this.renderBreadcrumb()}
                </div>
            </section>

        )
    }

}

export default Breadcrumb;