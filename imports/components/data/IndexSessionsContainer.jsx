import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'


import { Sessions } from '../../api/collections/sessions';
import IndexSessions from '../ui/IndexSessions'
import AjouterSession from '../outils/editeur/AjouterSession'

class IndexSessionsContainer extends Component {
    constructor(props) {
        super(props);
        this.getAction = this.getAction.bind(this);
        this.state = {
            badges: [{}],
        }
    }

    static propTypes = {
        sessions: PropTypes.array.isRequired,
    };

    static defaultProps = {
        sessions: [{}],
    };

    componentDidMount() {
        Meteor.call('chapitres.nombre.badge', (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
                this.setState({ badges: result })
            }
        })
    }

    getAction() {
        if (this.props.role == "editeur") {
            return (
                <AjouterSession {...this.props} />
            )
        }
        else {
            return undefined
        }
    }

    render() {

        if (!this.props.loading && this.props.sessionsExists) {

            return (
                <IndexSessions {...this.props} action={this.getAction()} badges={this.state.badges} />
            )

        } else {

            return <p>chargement en cours</p>
        }

  
    }
};

export default withTracker(() => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !sessionsHandle.ready();
    const sessions = Sessions.find({}).fetch();
    const sessionsExists = !loading && !!sessions;
    return {
        loading,
        sessionsExists,
        sessions: sessionsExists ? sessions : [{}],
    }
})(IndexSessionsContainer);