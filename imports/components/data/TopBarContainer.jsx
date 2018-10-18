import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';

import TopBar from '../ui/TopBar';
import FilAriane from '../ui/FilAriane';

class TopBarContainer extends React.Component {


    render() {

        // console.log(this.props)

        return (
            <div>
                <TopBar {...this.props} />
                <FilAriane {...this.props} />
            </div>
            
        )


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
})(TopBarContainer);