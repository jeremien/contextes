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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {

            let { pathname } = this.props.location;

            let currentSession = /\/sessions\/(.*)/g.exec(pathname);
            let currentChapitre = /\/session\/(.*)\/chapitre\/(.*)/g.exec(pathname);

            if (currentSession) {
                 Meteor.call('sessions.getTitre', currentSession[1], (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        this.setState({
                            session: result
                        });
                    }
                });
            }
 
            if (currentChapitre) {
                Meteor.call('chapitres.getTitre', currentChapitre[2], (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        this.setState({
                            chapitre: result
                        });
                    }
                });
            }
        }
    }

    renderBreadcrumb() {

        let { pathname } = this.props.location;


        // let { pathname } = this.state;

        let regexSessions = RegExp('\/sessions\/(.*)', 'g');
        let regexChapitre = RegExp('\/session\/(.*)\/chapitre\/(.*)', 'g');

        let session = regexSessions.test(pathname);
        let chapitre = regexChapitre.test(pathname);

        if (pathname === '/') {

            return (<span>accueil</span>);

        } else if (pathname === '/sessions') {

            return <span><Link to={'/'}>accueil</Link> / sessions</span>

        } else if (session) {

            return <span><Link to={'/'}>accueil</Link> / <Link to={"/sessions"}>sessions</Link> / {this.state.session} </span>;

        } else if (chapitre) {
            let currentSession = /\/session\/(.*)\/chapitre\/(.*)/g.exec(pathname);

            if (chapitre) {
                return (
                    <span><Link to={'/'}>accueil</Link> / <Link to={"/sessions"}>sessions</Link> / <Link to={`/sessions/${currentSession[1]}`}>{this.state.session}</Link> / {this.state.chapitre}
                    </span>
                )
            } else {
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